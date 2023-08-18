import { BracketsManager, helpers } from "brackets-manager"
import {
  InputStage,
  Seeding,
  StageType,
  Status,
  GrandFinalType,
  Match,
} from "brackets-model"
import { Request, Response, NextFunction } from "express"
import { RequestWithUser } from "../userController/authController"
import {
  Tournament,
  TournamentType,
  TournamentStatus,
} from "../../model/tournament"
import { Game } from "../../model/game"
import { MyDB } from "../../utils/MyDB"
import { GameManagement } from "../../utils/GameManagement"
import tournamentParticipantController from "./tournamentParticipantController"
import validator from "validator"
import { Types } from "mongoose"
import { User } from "../../model/User"
import jwt from "jsonwebtoken"

const getAllTournaments = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user._id
    const allTournaments = await Tournament.find({
      $or: [
        {
          participant: {
            $elemMatch: { userId: userId },
          },
        },
        { createdBy: userId },
      ],
    }).sort({ _id: -1 })
    res.status(200).send({ status: "success", data: allTournaments })
  } catch (error) {
    next(error)
  }
}
const updateTournament = async (
  req: RequestWithPlayer,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, description, status } = req.body

    const tournamentId = req.params.id
    let updatedTournament
    const { match } = req.body
    if (req.body.match) {
      const player = req.player
      updatedTournament = await updateTournamentMatch(
        tournamentId,
        match,
        player,
      )
    }
    const { stageType } = req.body
    if (req.body.stageType) {
      if (!req.player.tournamentOwner)
        throw new Error("You are not allowed to update this tournament")
      updatedTournament = await updateTournamentStageType(
        tournamentId,
        stageType,
        req.body.consolationFinal,
        req.body.grandFinal,
      )
    }
    if (name || description || status) {
      if (!req.player.tournamentOwner)
        throw new Error("You are not allowed to update this tournament")
      const updateData = { name, description, status }
      updatedTournament = await Tournament.findByIdAndUpdate(
        tournamentId,
        updateData,
        {
          new: true,
          runValidators: true,
        },
      )
    }
    res.status(200).send({
      status: "success",
      data: updatedTournament,
    })
  } catch (error) {
    next(error)
  }
}
async function updateTournamentMatch(
  tournamentId,
  match: Match,
  player: { tournamentOwner: boolean; firstName?: string },
): Promise<TournamentType> {
  const tournament = await Tournament.findById(tournamentId)
  if (!tournament) throw new Error("Invalid tournament id")
  const matchDetail = tournament.match.find((m) => m.id === match.id)
  const opponent1Name = tournament.participant.find(
    (p) => p.id === matchDetail.opponent1.id,
  ).name
  const opponent2Name = tournament.participant.find(
    (p) => p.id === matchDetail.opponent2.id,
  ).name

  if (
    !player.tournamentOwner &&
    !opponent1Name.includes(player.firstName) &&
    !opponent2Name.includes(player.firstName)
  ) {
    throw new Error("You are not allowed to update this match")
  }
  const myDB = new MyDB(tournament)
  const manager = new BracketsManager(myDB)
  await manager.update.match(match)
  const updatedTournament = await Tournament.findById(tournamentId)
  // manage game assignment
  const gameManagement = new GameManagement(updatedTournament)
  await gameManagement.addGameToMatches()

  try {
    // check if the tournament is finished
    const standing = await manager.get.finalStandings(0)
    if (standing) updatedTournament.status = TournamentStatus.completed
    await updatedTournament.save()
  } catch (e) {
    /* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
  }
  return updatedTournament
}

async function updateTournamentStageType(
  tournamentId,
  stageType: StageType,
  consolationFinal: boolean,
  grandFinal: GrandFinalType,
): Promise<TournamentType> {
  // get the tournamnent and check if the new StageType is different from the current one
  const tournament = await Tournament.findById(tournamentId)
  if (!tournament) throw new Error("Invalid tournament id")

  const stage = tournament.stage[0]
  if (stage.type === stageType && consolationFinal === undefined && !grandFinal)
    return tournament
  // get all the participant

  let participants = await prepareParticipants(
    tournament.participant.map((p) => {
      if (p.userId) return p.userId.toString()
      return p.name
    }),
    tournament._id,
  )
  participants = helpers.balanceByes(participants)

  // get the current stage Setting and update the stage type with the new one
  const inputStage: InputStage = {
    tournamentId: Number(tournamentId),
    name: tournament.name,
    type: stageType,
    settings: tournament.stage[0].settings,
    seeding: participants,
  }
  if (stageType === "single_elimination")
    inputStage.settings.consolationFinal = !!consolationFinal
  else inputStage.settings.grandFinal = grandFinal
  // delete match, stage, round, ground, match-game, participantGameMatrix,
  await Tournament.updateOne(
    { _id: tournamentId },
    {
      $unset: {
        stage: "",
        round: "",
        group: "",
        match: "",
        match_game: " ",
        participant: "",
        participantGameMatrix: "",
      },
    },
  )
  // create a new stage with the new stage type
  const myDB = await MyDB.build(tournamentId)
  const manager = await new BracketsManager(myDB)
  await manager.create(inputStage)
  let updatedTournament = await Tournament.findById(tournamentId)
  // run the game management to add the game to the match
  const gameManagement = new GameManagement(updatedTournament)
  await gameManagement.addGameToMatches()
  updatedTournament = await Tournament.findById(tournamentId)
  return updatedTournament
}

const createTournament = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      name,
      stageType,
      description,
      consolationFinal = true,
      grandFinal = "double",
      seedOrdering = ["natural"],
      games = [],
    } = req.body
    let participants = req.body.participants
    participants = helpers.balanceByes(participants)
    try {
      helpers.ensureNoDuplicates(participants)
    } catch (error) {
      throw { statusCode: 400, message: error.message }
    }

    const tournament = new Tournament({
      _id: Date.now(),
      name,
      description,
      game: games,
      createdBy: req.user._id,
    })
    await tournament.save()

    const myDB = await MyDB.build(tournament._id)

    const manager = new BracketsManager(myDB)

    const allParticipants = await prepareParticipants(
      participants,
      tournament.id,
    )

    const inputStage: InputStage = {
      tournamentId: Number(tournament._id),
      name,
      type: stageType,
      seeding: allParticipants,
      settings: {
        seedOrdering,
      },
    }
    if (stageType === "double_elimination") {
      inputStage.settings.grandFinal = grandFinal
    } else if (stageType === "single_elimination") {
      if (participants.length > 2)
        inputStage.settings.consolationFinal = consolationFinal
    }

    await manager.create(inputStage)
    const tournamentData = await Tournament.findById(tournament._id)
    const gameManagement = new GameManagement(tournamentData)
    await gameManagement.addGameToMatches()
    res.status(201).send({
      status: "success",
      data: tournamentData,
    })
  } catch (error) {
    next(error)
  }
}

const getTournament = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tournamentId = req.params.id
    const tournament = await Tournament.findById(tournamentId).populate({
      path: "game.gameId",
    })
    if (!tournament) throw { statusCode: 404, message: "Invalid tournament id" }

    res.status(200).send({ status: "success", data: tournament })
  } catch (error) {
    next(error)
  }
}

const deleteTournament = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await Tournament.findByIdAndDelete(req.params.id)
    if (!result) throw { status: 404, message: "tournament not found" }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

const updateTournamentGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tournamentId, gameId } = req.params
    const tournament = await Tournament.findById(tournamentId)
    const game = tournament.game.find(
      (game) => game.gameId._id.toString() === gameId,
    )
    if (!game) throw { statusCode: 404, message: "game not found" }
    game.count = req.body.count
    await tournament.save()

    const tournamentData = await Tournament.findById(tournament._id)
    const gameManagement = new GameManagement(tournamentData)
    await gameManagement.addGameToMatches()

    const updatedGames = (
      await Tournament.findById(tournamentId)
        .select("game")
        .populate("game.gameId")
    ).game
    const updatedGame = updatedGames.find((g) => g._id.toString() === gameId)

    res.status(200).send({ status: "success", data: updatedGame })
  } catch (error) {
    next(error)
  }
}

const addTournamentGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tournamentId } = req.params
    const { count, gameId } = req.body
    const game = await Game.findById(gameId)
    if (!game) throw { statusCode: 400, message: "game not found" }
    let tournament = await Tournament.findById(tournamentId)
    if (tournament.status !== "pending") {
      throw { statusCode: 400, message: "Tournament is not pending status" }
    }
    tournament = await Tournament.findByIdAndUpdate(
      tournamentId,
      {
        $push: {
          game: { gameId, count },
        },
      },
      { new: true, runValidators: true },
    )
    const newGame = tournament.game.find((g) => g.gameId.toString() === gameId)
    const tournamentData = await Tournament.findById(tournament._id)
    const gameManagement = new GameManagement(tournamentData)
    await gameManagement.addGameToMatches()

    res.status(201).send({ status: "success", data: newGame })
  } catch (error) {
    next(error)
  }
}

const deleteTournamentGame = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { tournamentId, gameId } = req.params
    const tournament = await Tournament.findById(tournamentId)
    if (!tournament) {
      throw { statusCode: 404, message: "Tournament not found" }
    }
    if (tournament.status !== "pending") {
      throw { statusCode: 400, message: "Tournament is not pending status" }
    }
    const gameIndex = tournament.game.findIndex(
      (game) => game.gameId._id.toString() === gameId,
    )
    if (gameIndex === -1) {
      throw { statusCode: 404, message: "Game not found" }
    }
    tournament.game.splice(gameIndex, 1)
    await tournament.save()
    const tournamentData = await Tournament.findById(tournament._id)
    const gameManagement = new GameManagement(tournamentData)
    await gameManagement.addGameToMatches()
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
export async function prepareParticipants(
  participants: string[],
  tournamentId: number,
): Promise<Seeding> {
  const participantPromise = participants.map((p) => {
    if (Types.ObjectId.isValid(p)) {
      return User.findById(p, { firstName: 1, lastName: 1 })
    }
    if (p && validator.isEmail(p)) {
      return User.findOne({ email: p }, { firstName: 1, lastName: 1 })
    }
    return p
  })
  const allParticipants = await Promise.all(participantPromise)
  return allParticipants.map((p, index) => {
    if (p instanceof User) {
      return {
        name: p.firstName + " " + p.lastName,
        userId: p._id,
        id: index,
        tournament_id: tournamentId,
        invitation: "pending",
      }
    }
    return p
  })
}
async function joinTournament(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: tournamentId } = req.params
    const { firstName } = req.body
    const tournament = await Tournament.findById(tournamentId)

    if (!tournament) {
      throw { statusCode: 404, message: "Tournament not found" }
    }
    const firstNames = tournament.participant.map((p) =>
      p.name.split(" ")[0].toLocaleLowerCase(),
    )
    if (!firstNames.includes(firstName.toLocaleLowerCase())) {
      throw {
        statusCode: 400,
        message: "You are not invited to the tournament",
      }
    }
    // issue a jwt token called tournament_token and send it the user
    const tournamentToken = jwt.sign(
      { tournamentId, firstName },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      },
    )

    const previousTokens = req.cookies.tournament_tokens || {}
    const tournament_tokens = {
      ...previousTokens,
      [tournamentId]: tournamentToken,
    }

    res.cookie("tournament_tokens", tournament_tokens, {
      expires: new Date(
        Date.now() +
          Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
      secure: true,
      sameSite: "none",
    })
    res.send({ status: "success" })
  } catch (error) {
    next(error)
  }
}

interface RequestWithPlayer extends Request {
  player: {
    tournamentOwner: boolean
    firstName?: string
  }
}

async function protectTournament(
  req: RequestWithPlayer,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id: tournamentIdParam } = req.params
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1]
      if (token) {
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as {
          id: string
        }
        if (id) {
          const tournament = await Tournament.findById(tournamentIdParam)
          if (!tournament)
            throw { statusCode: 404, message: "Tournament not found" }
          if (id === tournament.createdBy.toString()) {
            req.player = {
              tournamentOwner: true,
            }
            return next()
          }
        }
      }
    }
    if (req.cookies?.tournament_tokens) {
      const tokens = req.cookies.tournament_tokens
      if (tokens[tournamentIdParam]) {
        const { tournamentId, firstName } = jwt.verify(
          tokens[tournamentIdParam],
          process.env.JWT_SECRET,
        ) as {
          tournamentId: string
          firstName: string
        }
        if (tournamentId && tournamentId === tournamentIdParam) {
          req.player = {
            tournamentOwner: false,
            firstName,
          }
          return next()
        }
      }
    }
    throw { statusCode: 401, message: "Please join the tournament first" }
  } catch (error) {
    next(error)
  }
}

async function getTournamentStanding(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tournamentId = req.params.tournamentId
    const tournament = await Tournament.findById(tournamentId)
    const storage = new MyDB(tournament)
    const manager = new BracketsManager(storage)
    try {
      const standing = await manager.get.finalStandings(0)
      return res.send(standing)
    } catch (e) {
      res.send([])
    }
  } catch (error) {
    next(error)
  }
}

export default {
  getAllTournaments,
  getTournament,
  createTournament,
  deleteTournament,
  updateTournament,
  updateTournamentGame,
  addTournamentGame,
  deleteTournamentGame,
  prepareParticipants,
  joinTournament,
  protectTournament,
  getTournamentStanding,
  ...tournamentParticipantController,
}

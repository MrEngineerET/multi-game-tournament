import {
  TournamentType,
  Match,
  Game,
  TournamentStatus,
} from "../model/tournament"
import { Types } from "mongoose"
import { Status } from "brackets-model"

export class GameManagement {
  private tournament: TournamentType

  constructor(tournament: TournamentType) {
    this.tournament = tournament
  }

  public async addGameToMatches(): Promise<void> {
    if (this.tournament.status === TournamentStatus.pending) {
      await this.clearGameInMatch()
      await this.clearParticipantGameMatrix()
    }
    if (this.tournament.participantGameMatrix.length === 0) {
      await this.generateParticipantGameMatrix()
    }
    await this.assignGames()
  }

  private async assignGames(): Promise<void> {
    const eligibleMatches = this.getEligibleMatches()
    const availableGames = this.getAvailableGames()
    const participantGameMatrix = this.tournament.participantGameMatrix

    for (let i = 0; i < eligibleMatches.length; i++) {
      const match = eligibleMatches[i]
      let minPlays = Number.MAX_SAFE_INTEGER
      let minPlaysGame: Types.ObjectId | null = null
      const participantOne = participantGameMatrix.find(
        (p) => p.participantId === match.opponent1.id,
      )
      const participantTwo = participantGameMatrix.find(
        (p) => p.participantId === match.opponent2.id,
      )

      for (let j = 0; j < availableGames.length; j++) {
        const availableGame = availableGames[j]
        if (availableGame.count === 0) continue
        const participantOneGame = participantOne.games.find((g) =>
          g.gameId.equals(availableGame.gameId),
        )
        const playerOneGameCount = participantOneGame.count

        const participantTwoGame = participantTwo.games.find((g) =>
          g.gameId.equals(availableGame.gameId),
        )
        const playerTwoGameCount = participantTwoGame.count

        if (playerOneGameCount + playerTwoGameCount < minPlays) {
          minPlays = playerOneGameCount + playerTwoGameCount
          minPlaysGame = availableGame.gameId
        }
      }

      if (minPlaysGame) {
        eligibleMatches[i].gameId = minPlaysGame
        participantOne.games.find((g) => g.gameId.equals(minPlaysGame)).count++
        participantTwo.games.find((g) => g.gameId.equals(minPlaysGame)).count++

        availableGames.find((g) => g.gameId === minPlaysGame).count--
      }
      await this.tournament.save()
    }
  }

  private getEligibleMatches(): Match[] {
    const eligibleMatches = this.tournament.match.filter(
      (m) =>
        m.status === Status.Ready && !m.gameId && m.opponent1 && m.opponent2,
    )
    return eligibleMatches
  }

  private getAvailableGames(): Game[] {
    const matches = this.tournament.match
    const availableGames = this.tournament.game.toObject()
    for (let i = 0; i < matches.length; i++) {
      if (
        matches[i].gameId &&
        (matches[i].status === Status.Ready ||
          matches[i].status === Status.Running)
      ) {
        const index = availableGames.findIndex((g) =>
          g.gameId.equals(matches[i].gameId),
        )
        availableGames[index].count--
      }
    }
    return availableGames
  }

  private async clearParticipantGameMatrix(): Promise<void> {
    this.tournament.participantGameMatrix = [] as any
    await this.tournament.save()
  }
  private async clearGameInMatch(): Promise<void> {
    this.tournament.match.forEach((m) => (m.gameId = null))
    await this.tournament.save()
  }

  private async generateParticipantGameMatrix() {
    const participantLength = this.tournament.participant.length
    const gameIds = this.tournament.game.map((g) => g.gameId)

    for (let i = 0; i < participantLength; i++) {
      this.tournament.participantGameMatrix.push({
        participantId: i,
        games: [],
      })
      await this.tournament.save()
      for (let j = 0; j < gameIds.length; j++) {
        this.tournament.participantGameMatrix[i].games.push({
          gameId: gameIds[j],
          count: 0,
        })
      }
      await this.tournament.save()
    }
  }
}

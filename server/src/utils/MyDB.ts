import { CrudInterface, Table, OmitId } from "brackets-manager"
import {
  Stage,
  Group,
  Round,
  Match,
  MatchGame,
  Participant,
} from "brackets-model"
import { Tournament, TournamentType } from "../model/tournament"
import { deepMerge, filterArrayOfObjects } from "./utils"

interface DataTypes {
  stage: Stage
  group: Group
  round: Round
  match: Match
  match_game: MatchGame
  participant: Participant
}

export class MyDB implements CrudInterface {
  private tournament: TournamentType
  constructor(tournament) {
    this.tournament = tournament
  }
  static async build(tournamentId: number) {
    const tournament = await Tournament.findById(Number(tournamentId))
    if (!tournament) {
      throw new Error("Invalid Tournament Id")
    }
    return new MyDB(tournament)
  }
  // INSERT
  /**
   * Inserts multiple values in the database.
   *
   * @param table Where to insert.
   * @param values What to insert.
   */
  public async insert<T extends Table>(
    table: T,
    value: OmitId<DataTypes[T]>,
  ): Promise<number>
  /**
   * Inserts multiple values in a table.
   *
   * @param table Where to insert.
   * @param values What to insert.
   */
  public async insert<T extends Table>(
    table: T,
    values: OmitId<DataTypes[T]>[],
  ): Promise<boolean>

  /**
   * Inserts a unique value or multiple values in a table.
   *
   * @param table Name of the table.
   * @param arg A single value or an array of values.
   */
  public async insert<T extends Table>(
    table: T,
    arg: OmitId<DataTypes[T]> | OmitId<DataTypes[T]>[],
  ): Promise<number | boolean> {
    // console.log("running INSERT ====>")
    // console.log(table, arg)

    let lastIndex = this.tournament[table].length - 1
    if (!Array.isArray(arg)) {
      try {
        // add the data to the database
        const id = lastIndex + 1
        const newValue = {
          ...arg,
          id,
        } as DataTypes[T]

        const arr = this.tournament[table].toObject()
        arr.push(newValue)
        this.tournament[table] = arr
        await this.tournament.save()
        return id
      } catch (error) {
        return -1
      }
    }
    try {
      // add the array to the database
      const newValues = arg.map(
        (el) => ({ ...el, id: ++lastIndex } as DataTypes[T]),
      )
      const arr = this.tournament[table].toObject()
      arr.push(...newValues)
      this.tournament[table] = arr
      await this.tournament.save()
      return true
    } catch (error) {
      return false
    }
  }

  //SELECT
  /**
   * Gets all data from a table in the database.
   *
   * @param table Where to get from.
   */
  public select<T extends Table>(table: T): Promise<Array<DataTypes[T]> | null>
  /**
   * Gets specific data from a table in the database.
   *
   * @param table Where to get from.
   * @param id What to get.
   */
  public select<T extends Table>(
    table: T,
    id: number,
  ): Promise<DataTypes[T] | null>
  /**
   * Gets data from a table in the database with a filter.
   *
   * @param table Where to get from.
   * @param filter An object to filter data.
   */
  public select<T extends Table>(
    table: T,
    filter: Partial<DataTypes[T]>,
  ): Promise<Array<DataTypes[T]> | null>

  /**
   * Gets a unique elements, elements matching a filter or all the elements in a table.
   *
   * @param table Name of the table.
   * @param arg An index or a filter.
   */
  public async select<T extends Table>(
    table: T,
    arg?: number | Partial<DataTypes[T]>,
  ): Promise<DataTypes[T] | Array<DataTypes[T]> | null> {
    // console.log("running SELECT ====>")
    // console.log(table, arg)
    try {
      if (arg === undefined) {
        const res = this.tournament[table]
        if (res.length === 0) return null
        return res.toObject() as Array<DataTypes[T]>
      }
      if (typeof arg === "number") {
        // return the specific data
        const index = this.tournament[table]
          .toObject()
          .findIndex((value) => value.id == arg)
        if (index == -1) return null
        return this.tournament[table].toObject()[index] as DataTypes[T]
      }
      // there is a filter, and use the filter to select the data
      const filteredArr = filterArrayOfObjects(
        this.tournament[table].toObject(),
        arg,
      )
      if (filteredArr.length === 0) return null
      return filteredArr
    } catch (error) {
      return null
    }
  }

  //UPDATE
  /**
   * Updates data in a table.
   *
   * @param table Where to update.
   * @param id What to update.
   * @param value How to update.
   */
  public update<T extends Table>(
    table: T,
    id: number,
    value: DataTypes[T],
  ): Promise<boolean>
  /**
   * Updates data in a table.
   *
   * @param table Where to update.
   * @param filter An object to filter data.
   * @param value How to update.
   */
  public update<T extends Table>(
    table: T,
    filter: Partial<DataTypes[T]>,
    value: Partial<DataTypes[T]>,
  ): Promise<boolean>

  /**
   * Updates one or multiple elements in a table.
   *
   * @param table Name of the table.
   * @param arg An index or a filter.
   * @param value The whole object if arg is an index or the values to change if arg is a filter.
   */
  public async update<T extends Table>(
    table: T,
    arg: number | Partial<DataTypes[T]>,
    value: DataTypes[T] | Partial<DataTypes[T]>,
  ): Promise<boolean> {
    // console.log("running UPDATE ====>")
    // console.log(table, arg, value)
    if (typeof arg === "number") {
      try {
        // update the value and return true or false based on the succeess
        const index = this.tournament[table]
          .toObject()
          .findIndex((val) => val.id === arg)
        if (index === -1) return false
        this.tournament[table].set(index, value as any)
        await this.tournament.save()
        return true
      } catch (error) {
        console.log("Error--> ", error)
        return false
      }
    }
    // use this place to update the data using the filter
    try {
      this.tournament[table].toObject().forEach((el, index) => {
        const update = Object.entries(arg).every(
          ([key, value]) => el[key] === value,
        )
        if (update) {
          const merged = deepMerge(JSON.parse(JSON.stringify(el)), value)
          this.tournament[table].set(index, merged)
        }
      })

      await this.tournament.save()

      return true
    } catch (error) {
      return false
    }
  }

  //DELETE
  /**
   * Empties a table completely.
   *
   * @param table Where to delete everything.
   */
  delete<T extends Table>(table: T): Promise<boolean>
  /**
   * Delete data in a table, based on a filter.
   *
   * @param table Where to delete in.
   * @param filter An object to filter data.
   */
  delete<T extends Table>(
    table: T,
    filter: Partial<DataTypes[T]>,
  ): Promise<boolean>

  /**
   * Delete data in a table, based on a filter.
   *
   * @param table Where to delete in.
   * @param filter An object to filter data or undefined to empty the table.
   */
  public async delete<T extends Table>(
    table: Table,
    filter?: Partial<DataTypes[T]>,
  ): Promise<boolean> {
    console.log("running DELETE ====>")
    // console.log(table, filter)

    if (!filter) {
      // delete all the data
      this.tournament[table] = [] as any[T]
      await this.tournament.save()
      return true
    }
    // use this place to delete data using the filter provided
    // this.tournament[table] = this.tournament[table].filter((val) =>
    //   Object.entries(filter).some(([key, value]) => val[key] !== value),
    // )
    this.tournament.save()
    return true
  }
}

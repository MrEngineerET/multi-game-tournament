import { CrudInterface, Table, OmitId } from "brackets-manager"
import {
  Stage,
  Group,
  Round,
  Match,
  MatchGame,
  Participant,
} from "brackets-model"

interface DataTypes {
  stage: Stage
  group: Group
  round: Round
  match: Match
  match_game: MatchGame
  participant: Participant
}

export class MyDB implements CrudInterface {
  constructor(fileName) {
    console.log("constructor running ===> file name ", fileName)
  }
  // INSERT
  /**
   * Inserts multiple values in the database.
   *
   * @param table Where to insert.
   * @param values What to insert.
   */
  public insert<T extends Table>(
    table: T,
    value: OmitId<DataTypes[T]>,
  ): Promise<number>
  /**
   * Inserts multiple values in a table.
   *
   * @param table Where to insert.
   * @param values What to insert.
   */
  public insert<T extends Table>(
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
    console.log("insert running ====>")
    console.log("table", table)
    console.log("arg", arg)
    return 1
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
    console.log("select running ====>")
    console.log("table", table)
    console.log("arg", arg)
    return null
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
    console.log("update running ====>")
    console.log("table", table)
    console.log("arg", arg)
    console.log("value", value)
    return true
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
    console.log("delete running ====>")
    console.log("table", table)
    console.log("filter", filter)
    return false
  }
}

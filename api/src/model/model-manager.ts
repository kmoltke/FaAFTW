import * as fs from "fs/promises"
import {HttpError} from "../utils/http-errors"

/**
 * ModelManager is a generic class to store filepath and provide necessary functions for each controller type
 */
export class ModelManager<T extends { id: number }> {
  filePath: string  // File path
  type: String      // Specefies the manager type for error message purposes

  constructor(filePath: string) {
    this.filePath = filePath
    const plural = filePath.replace(/.+\/([a-z]+).json/, "$1")
    this.type = plural[0].toUpperCase() + plural.slice(1, plural.length - 1)
  }

  /**
   * Get the whole json object from the datafile
   * @returns items - json object
   * @throws HttpError - File does not exist
   */
  async getAll(): Promise<T[]> {
    try {
      let itemsTxt = await fs.readFile(this.filePath, "utf8")
      return JSON.parse(itemsTxt)
    } catch (err: any) {
      throw new HttpError(404, `Server error: File does not exist`)
    }
  }

  /**
   * saves the array to the specific datafile
   * @param items - itemArray
   */
  async save(items: T[]) {
    // format and write to datafile:
    let itemsTxt = JSON.stringify(items, null, 2)
    await fs.writeFile(this.filePath, itemsTxt)
  }

  /**
   * Search for an id in an array
   * @param arr - Item Array to seach in
   * @param Id - Id to search for
   * @returns index of element in arr.
   * -1 if element does not exist
   */
  findItem(arr: T[], Id: number) {
    return arr.findIndex((currItem) => currItem.id === Id)
  }

  /**
   * Gets the item by a specific ID
   * @param itemId
   * @returns itemArray
   * @throws HttpError
   */
  async getByID(itemId: number) {
    const itemArray = await this.getAll()
    const index = this.findItem(itemArray, itemId)
    if (index === -1) {
      throw new HttpError(404, `${this.type} with ID: ${itemId} doesn't exist`)
    } else {
      return itemArray[index]
    }
  }

  /**
   * Adds a new item to the datafile
   * @param newItem json object of which to add
   * @throws HttpError if Item ID does not exist
   */
  async add(newItem: T) {
    const itemArr = await this.getAll()

    // If item already exists:
    if (this.findItem(itemArr, newItem.id) !== -1) {
      throw new HttpError(
        400,
        `${this.type} with ID: ${newItem.id} already exists`
      )
    }
    // push to itemArray and save
    itemArr.push(newItem)
    await this.save(itemArr)
  }

  // update existing item
  async update(itemId: number, newItem: T) {
    let itemArray = await this.getAll()
    let index = this.findItem(itemArray, itemId)
    if (index === -1)
      throw new HttpError(404, `${this.type} with ID:${itemId} doesn't exist`)
    else {
      itemArray[index] = newItem
      await this.save(itemArray)
    }
  }

  /**
   * removes a specific item
   * @param itemId
   * @throws HttpError if item does not exist
   */
  async remove(itemId: number) {
    let itemArray = await this.getAll()
    let index = this.findItem(itemArray, itemId)
    if (index === -1)
      throw new HttpError(404, `${this.type} with ID:${itemId} doesn't exist`)
    else {
      itemArray.splice(index, 1) // remove item from array
      await this.save(itemArray)
    }
  }
}

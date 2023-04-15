import * as fs from "fs/promises"
import { stringify } from "querystring"

export class ModelManager<T extends { id: number }> {
  filePath: string
  type: String

  constructor(filePath: string) {
    this.filePath = filePath
    const plural = filePath.replace(/.+\/([a-z]+).json/, "$1")
    this.type = plural[0].toUpperCase() + plural.slice(1, plural.length - 1)
  }

  /***
   * Get the whole json object from the datafile
   * @returns items - json object
   */
  async getAll(): Promise<T[]> {
    try {
      let itemsTxt = await fs.readFile(this.filePath, "utf8")
      let items = JSON.parse(itemsTxt)
      return items
    } catch (err: any) {
      throw err
    }
  }

  async save(items: T[]) {
    // format and write to datafile:
    let itemsTxt = JSON.stringify(items, null, 2)
    await fs.writeFile(this.filePath, itemsTxt)
  }

  /***
   * Search for an id in an array
   * @param arr
   * @param Id
   * @returns index of element in arr
   */
  findItem(arr: T[], Id: number) {
    return arr.findIndex((currItem) => currItem.id === Id)
  }

  // get by id
  async getByID(itemId: number) {
    const itemArray = await this.getAll()
    const index = this.findItem(itemArray, itemId)
    if (index === -1) {
      throw new Error(`${this.type} with ID: ${itemId} doesn't exist`)
    } else {
      return itemArray[index]
    }
  }

  /***
   * Adds a new item to the datafile
   * @param newItem json object of which to add
   * @throws an error if item already exists
   */
  async add(newItem: T) {
    const itemArr = await this.getAll()

    // If item already exists:
    if (this.findItem(itemArr, newItem.id) !== -1) {
      throw new Error(`${this.type} with ID: ${newItem.id} already exists`)
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
      throw new Error(`${this.type} with ID:${itemId} doesn't exist`)
    else {
      itemArray[index] = newItem
      await this.save(itemArray)
    }
  }

  // delete existing item
  async remove(itemId: number) {
    let itemArray = await this.getAll()
    let index = this.findItem(itemArray, itemId)
    if (index === -1)
      throw new Error(`${this.type} with ID:${itemId} doesn't exist`)
    else {
      itemArray.splice(index, 1) // remove item from array
      await this.save(itemArray)
    }
  }
}

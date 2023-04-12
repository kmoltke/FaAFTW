import * as fs from "fs/promises"
import { basket, basketProduct, isBasketProduct } from "../basket/baskets.model"
import { category } from "../categories/categories.model"
import { user } from "../users/users.model"
import { vinyl } from "../vinyls/vinyls.model"

export enum managerType {
  users,
  categories,
  baskets,
  vinyls,
  basketProducts,
}

interface data {
  users: user[]
  categories: category[]
  baskets: basket[]
  vinyls: vinyl[]
  basketProducts: basketProduct[]
}

export class ModelManager<T extends { id: number }> {
  private FILEPATH: string = "./data/data.json"

  private managerType: managerType

  constructor(managerType: managerType) {
    this.managerType = managerType
  }

  // get by id
  async getByID(itemId: number) {
    let itemArray = await this.getItemArray(this.managerType)
    let index = this.findItem(itemArray, itemId)
    if (index === -1) {
      throw new Error(`Item with ID: ${itemId} doesn't exist`)
    } else return itemArray[index]
  }

  /***
   * Adds a new item to the datafile
   * @param newItem json object of which to add
   * @throws an error if item already exists
   */
  async add(newItem: user | category | basket | vinyl) {
    let itemArr: Array<user | category | basket | vinyl> =
      await this.getItemArray(this.managerType)

    // If item already exists:
    if (this.findItem(itemArr, newItem.id) !== -1) {
      throw new Error(`Item with ID: ${newItem.id} already exists`)
    }
    // push to itemArray and save
    itemArr.push(newItem)
    await this.save(itemArr)
  }

  // update existing item
  async update(itemId: number, newItem: user | category | basket | vinyl) {
    let itemArray: Array<user | category | basket | vinyl> =
      await this.getItemArray(this.managerType)
    let index = this.findItem(itemArray, itemId)
    if (index === -1) throw new Error(`Item with ID:${itemId} doesn't exist`)
    else {
      itemArray[index] = newItem
      await this.save(itemArray)
    }
  }

  // delete existing item
  async remove(itemId: number) {
    let itemArray = await this.getItemArray(this.managerType)
    let index = this.findItem(itemArray, itemId)
    if (index === -1) throw new Error(`Item with ID:${itemId} doesn't exist`)
    else {
      itemArray.splice(index, 1) // remove item from array
      await this.save(itemArray)
    }
  }

  /**
   * adds or updates a product in the basket with the following id
   * @param basketId the id of the basket
   * @param newItem json object to add
   */
  async addBasketProduct(userId: number, newItem: basketProduct) {
    let itemArray: any = await this.getItemArray(this.managerType)
    // find basket
    let basketIndex = this.findItem(itemArray, userId)
    if (basketIndex === -1)
      throw new Error(`Basket for user ID:${userId} doesn't exist`)
    else {
      //find the products
      let productsArray = itemArray[basketIndex].products
      const productIndex = this.findItem(productsArray, newItem.id)
      console.log(productIndex)
      // if product does not already exist in the basket, add a new one
      if (productIndex === -1) {
        productsArray.push(newItem)
      } else {
        //else update its quantity and price
        productsArray[productIndex].quantity += newItem.quantity
        productsArray[productIndex].price += newItem.price * newItem.quantity
      }
      //assign the new total to the "total" property of the basket
      itemArray[basketIndex].total = this.getTotalPrice(productsArray)
      await this.save(itemArray)
    }
  }

  async removeBasketProduct(
    userId: number,
    productId: number,
    quantity?: number
  ) {
    let itemArray: any = await this.getItemArray(this.managerType)
    // find basket
    let basketIndex = this.findItem(itemArray, userId)
    if (basketIndex === -1)
      throw new Error(`Item with ID:${userId} doesn't exist`)
    else {
      //find the products in the basket
      const productsArray = itemArray[basketIndex].products
      const productIndex = this.findItem(productsArray, productId)
      if (productIndex === -1)
        throw new Error(`Item with ID:${productId} doesn't exist`)
      else {
        if (quantity === undefined) {
          productsArray.splice(productIndex, 1)
        } else {
        }
      }
      itemArray[basketIndex].total = this.getTotalPrice(productsArray)
      await this.save(itemArray)
    }
  }

  /***
   * Get the array of item from the json data file
   * @param managerType - the item type
   * @returns items[key] - array of items
   */
  async getItemArray(managerType: managerType) {
    let items: data = await this.getAll()
    type dataKey = keyof typeof items
    let key: dataKey

    switch (managerType) {
      case 0:
        key = "users" as dataKey
        return items[key]

      case 1:
        // return items["categories"] as category[]
        key = "categories" as dataKey
        return items[key]
      case 2:
        key = "baskets" as dataKey
        return items[key]
      case 3:
        key = "vinyls" as dataKey
        return items[key]
      default:
        throw new Error("undefined!")
    }
  }

  getImportants(vinyls: vinyl[]) {
    return vinyls.map((v) => ({
      album: v.album,
      artist: v.artist,
      price: v.price,
    }))
  }

  /**
   * Gets total price from all products in the basket
   * @param basketProducts
   * @returns the total price of all products in the basket
   */
  getTotalPrice(basketProducts: basketProduct[]) {
    return basketProducts
      .map((obj: basketProduct) => obj.price)
      .reduce(function (acc: number, curr: number) {
        return acc + curr
      }, 0)
  }

  // async getByCategory(category: string, sub: string) {
  //     let allVinyls = await this.getItemArray(managerType.vinyls)
  //
  //     let filtered = (allVinyls as vinyl[]).filter(function (v) {
  //         type dataKey = keyof typeof v
  //         let key: dataKey
  //         key = category as dataKey
  //         let value = (v[key] as string).toLowerCase()
  //         return (value == sub);
  //     })
  //
  //     return this.getImportants(filtered)
  //
  //
  // }

  /***
   * Get the whole json object from the datafile
   * @returns items - json object
   */
  async getAll() {
    try {
      let itemsTxt = fs.readFile(this.FILEPATH, "utf8")
      let items: data = JSON.parse(await itemsTxt)
      return items
    } catch (err: any) {
      throw err
    }
  }

  /***
   * Saves a new itemArray to the json datafile
   * @param newItemArray
   */
  async save(newItemArray: any) {
    let items = await this.getAll()

    // Replace the property of the item with the new item array:
    switch (this.managerType) {
      case 0:
        items.users = newItemArray
        break
      case 1:
        items.categories = newItemArray
        break
      case 2:
        items.baskets = newItemArray
        break
      case 3:
        items.vinyls = newItemArray
        break
      default:
        throw new Error("Error!")
    }

    // format and write to datafile:
    let itemsTxt = JSON.stringify(items, null, 2)
    await fs.writeFile(this.FILEPATH, itemsTxt)
  }

  /***
   * Search for an id in an array
   * @param arr
   * @param Id
   * @returns index of element in arr
   */
  findItem(
    arr: Array<user | category | basket | vinyl | basketProduct>,
    Id: number
  ): number {
    return arr.findIndex((currItem) => currItem.id === Id)
  }

  /**
   * search for any provided property and property value
   * @param arr
   * @param propertyName
   * @param property
   * @returns index of the first elemment with the following property
   */
  findItemByProperty(
    arr: Array<user | category | basket | vinyl | basketProduct>,
    propertyName: string,
    property: any
  ): number {
    return arr.findIndex((currItem: any) => currItem[propertyName] === property)
  }
}

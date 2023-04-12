import * as fs from 'fs/promises'
import { Basket, BasketProduct } from '../baskets/baskets.model'
import { Category } from '../categories/categories.model'
import { User } from '../users/users.model'
import { Vinyl } from '../vinyls/vinyls.model'

// export enum managerType {
//   users,
//   categories,
//   baskets,
//   vinyls,
//   basketProducts,
// }

// interface data {
//   users: User[]
//   categories: Category[]
//   baskets: Basket[]
//   vinyls: Vinyl[]
//   basketProducts: BasketProduct[]
// }

enum ModelTypes {
  User,
  Category,
  Basket,
  Vinyl,
  BasketProduct,
}

export class ModelManager<ModelTypes> {
  filePath: string

  constructor(filePath: string) {
    this.filePath = filePath
  }

  /***
   * Get the whole json object from the datafile
   * @returns items - json object
   */
  async getAll() {
    try {
      let itemsTxt = await fs.readFile(this.filePath, 'utf8')
      let items = JSON.parse(itemsTxt)
      return items
    } catch (err: any) {
      throw err
    }
  }

  async save(items: Array<ModelTypes>) {
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
  findItem(arr: Array<any>, Id: number): number {
    return arr.findIndex((currItem) => currItem.id === Id)
  }

  // get by id
  async getByID(itemId: number) {
    let itemArray = await this.getAll()
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
  async add(newItem: any) {
    let itemArr: Array<ModelTypes> = await this.getAll()

    // If item already exists:
    if (this.findItem(itemArr, newItem.id) !== -1) {
      throw new Error(`Item with ID: ${newItem.id} already exists`)
    }
    // push to itemArray and save
    itemArr.push(newItem)
    await this.save(itemArr)
  }

  // update existing item
  async update(itemId: number, newItem: ModelTypes) {
    let itemArray: Array<ModelTypes> = await this.getAll()
    let index = this.findItem(itemArray, itemId)
    if (index === -1) throw new Error(`Item with ID:${itemId} doesn't exist`)
    else {
      itemArray[index] = newItem
      await this.save(itemArray)
    }
  }

  // delete existing item
  async remove(itemId: number) {
    let itemArray = await this.getAll()
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
  async addBasketProduct(userId: number, newItem: BasketProduct) {
    let itemArray: any = await this.getAll()
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
    let itemArray: any = await this.getAll()
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

  getImportants(vinyls: Vinyl[]) {
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
  getTotalPrice(basketProducts: BasketProduct[]) {
    return basketProducts
      .map((obj: BasketProduct) => obj.price)
      .reduce(function (acc: number, curr: number) {
        return acc + curr
      }, 0)
  }

  /**
   * search for any provided property and property value
   * @param arr
   * @param propertyName
   * @param property
   * @returns index of the first elemment with the following property
   */
  findItemByProperty(
    arr: Array<ModelTypes>,
    propertyName: string,
    property: any
  ): number {
    return arr.findIndex((currItem: any) => currItem[propertyName] === property)
  }
}

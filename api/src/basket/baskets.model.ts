import * as fs from "fs/promises"

const DATAFILE: string = "./data/data.json"

export interface basketProduct {
  id: number
  quantity: number // eleb: added quantity
  price: number
}

export interface basket {
  id: number
  BasketId: number
  products: basketProduct[]
  total: number
}

export function isBasketProduct(x: any): x is basketProduct {
  return x && "productID" in x
}

//
// const getData = async () => {
//   return await fs.readFile(DATAFILE)
// }
//
// // fetch everything from basket (empty array to begin with?)
// export const getAll = async () => {
//   try {
//     const dataTxt = await getData()
//     // @ts-ignore
//     const data = JSON.parse(dataTxt)
//     const baskets: basket[] = data[2]
//     return baskets
//   } catch (err) {
//     // @ts-ignore
//     if (err.code == "ENOENT") { // File does not exist
//       await save([])
//       return []
//     } else {
//       throw new Error('not working')
//     }
//   }
// }
//
//
// export async function add(newBasket: basket) {
//   let baskets = await getAll()
//   if (findUser(baskets, newBasket.userID) !== -1) {
//     throw new Error(`User ID: ${newBasket.userID} already exists`)
//   } else {
//     baskets.push()
//     await save(baskets)
//   }
// }
//
// function findUser(baskets: basket[], id: number) {
//   return baskets.findIndex(
//       (basket) => basket.userID == id
//   )
//
//   // baskets.forEach((b, i) => {
//   //   if (b.userID == id) return i
//   // })
//
//   // baskets.forEach((b, i) => {
//   //   if (b.userID == id) {
//   //     return i
//   //   }
//   // })
//   // return -1
// }
//
// export async function save(baskets: basket[]) {
//   let basketsToString: string = JSON.stringify(baskets)
//   await fs.writeFile(DATAFILE, basketsToString)
// }

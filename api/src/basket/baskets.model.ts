import * as fs from 'fs/promises'

const DATAFILE: string = './data/data.json'

// TODO: rethink this maybe
export interface basketProduct {
  prodID: number;
  price: number;
}

export interface basket {
  userID: number;
  products: basketProduct[];
  total: number;
}

const getData = async () => {
  return await fs.readFile(DATAFILE)
}

// fetch everything from basket (empty array to begin with?)
export const getAll = async () => {
  try {
    const data = await getData()
    // @ts-ignore
    const baskets: basket[] = JSON.parse(data)
    return baskets
  } catch (err) {
    // @ts-ignore
    if (err.code == "ENOENT") { // File does not exist
      await save([])
      return []
    } else {
      throw new Error('not working')
    }
  }
}


export async function add(newBasket: basket) {
  let baskets = await getAll()
  if (findUser(baskets, newBasket.userID) !== -1) {
    throw new Error(`User ID: ${newBasket.userID} already exists`)
  } else {
    baskets.push()
    await save(baskets)
  }
}

function findUser(baskets: basket[], id: number) {
  // return baskets.findIndex(
  //     (basket) => basket.userID == id
  // )
  baskets.forEach((b, i) => {
    if (b.userID == id) return i
  })
  return -1
}

export async function save(baskets: basket[]) {
  let basketsToString: string = JSON.stringify(baskets)
  await fs.writeFile(DATAFILE, basketsToString)
}
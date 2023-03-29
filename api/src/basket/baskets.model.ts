import * as fs from 'fs/promises'

const DATAFILE: string = './data/data.json'

const getData = async () => {
  return await fs.readFile(DATAFILE)
}

// fetch everything from basket (empty array to begin with?)

export const getAll = async () => {
  try {
    const data = await getData()
    // @ts-ignore
    const { baskets } = JSON.parse(data)
    return baskets
  } catch (err) {
    throw new Error('not working')
  }
}


export async function add(userId: number) {
  let basket = await getAll()

}

function findUser(basket:, id) {
  return basket.findIndex(
      (usr) => usr.id == id
  )
}
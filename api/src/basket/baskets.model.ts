import * as fs from 'fs/promises'

const getData = async () => {
  return await fs.readFile('./data/data.json')
}

// fetch everything from all baskets (empty array to begin with?)

export const getAll = async () => {
  try {
    const data = await getData()
    const { baskets } = JSON.parse(data)
    return baskets
  } catch (err) {
    throw new Error('')
  }
}

// fetch everything from a specific basket by id

export async function findBasket (id: number) {
  try {
    const data = await getData()
    const { baskets } = JSON.parse(data)
    return baskets.filter((basket) => basket.id === id)
  } catch (error) {}
}



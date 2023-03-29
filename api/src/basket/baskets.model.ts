import * as fs from 'fs/promises'

const getData = async () => {
  return await fs.readFile('./data/data.json')
}

// fetch everything from basket (empty array to begin with?)

export const getAll = async () => {
  try {
    const data = await getData()
    const { baskets } = JSON.parse(data)
    return baskets
  } catch (err) {
    throw new Error('not working')
  }
}
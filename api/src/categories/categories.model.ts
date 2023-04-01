import * as fs from 'fs/promises'

export interface category {
  id: number
  genre: string[]
  decades: string[]
}

const getData = async () => {
  return await fs.readFile('./data/data.json')
}

export const getAll = async () => {
  try {
    const data = await getData()
    const { categories } = JSON.parse(data.toString())

    return categories
  } catch (err) {
    throw new Error('')
  }
}

export const getByName = async (categoryName: string) => {
  try {
    const data = await getData()
    const { categories } = JSON.parse(data.toString())
    return categories[categoryName]
  } catch (err) {
    throw new Error('')
  }
}

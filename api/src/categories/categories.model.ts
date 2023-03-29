import * as fs from 'fs/promises'

const getData = async () => {
  return await fs.readFile('./data/data.json')
}

export const getAll = async () => {
  try {
    const data = await getData()
    const { categories } = JSON.parse(data)

    return categories
  } catch (err) {
    throw new Error('')
  }
}

export const getByName = async (categoryName: string) => {
  try {
    const data = await getData()
    const { categories } = JSON.parse(data)
    return categories[categoryName]
  } catch (err) {
    throw new Error('')
  }
}
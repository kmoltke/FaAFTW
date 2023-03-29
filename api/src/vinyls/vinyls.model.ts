import * as fs from 'fs/promises'

const getData = async () => {
  return await fs.readFile('./data/data.json')
}

export async function getAll() {
  try {
    const data = await getData()
    // @ts-ignore
    const { vinyls } = JSON.parse(data)

    return vinyls
  } catch (err) {
    throw new Error('')
  }
}

export async function getById(id: number) {
  try {
    const data = await getData()
    // @ts-ignore
    const { vinyls } = JSON.parse(data)
    // @ts-ignore
    return vinyls.filter((vinyl) => vinyl.id === id)
  } catch (error) {}
}

export async function getByCategory(category: string) {}

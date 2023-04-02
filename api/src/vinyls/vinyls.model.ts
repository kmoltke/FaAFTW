import * as fs from 'fs/promises'

//vinyl schema
type vinylObject = {
  id: number
  artist: string
  album: string
  decade: string
  year: number
  genre: string
  price: number
  type: string
  label: string
  image: string
  description: string
}

const getData = async () => {
  const data = await fs.readFile('./data/data.json')
  return JSON.parse(data.toString())
}

export async function getAll() {
  try {
    const data = await getData()
    const { vinyls } = JSON.parse(data.toString())

    return vinyls
  } catch (err) {
    throw new Error('')
  }
}

export async function getById(id: number) {
  try {
    const data = await getData()
    const { vinyls } = JSON.parse(data.toString())
    return vinyls.filter((vinyl: vinylObject) => vinyl.id === id)
  } catch (error) {}
}

export async function getByCategory(category: string) {
  try {
    const data = await getData()
    const { vinyls } = JSON.parse(data.toString())

    return vinyls
  } catch (error) {
    throw new Error(error)
  }
}

export async function add(newVinyl: vinylObject) {
  let data = await getData()

  //TODO: refactor if statement into a new function
  if (
    data.vinyls.filter((vinyl: vinylObject) => vinyl.id === newVinyl.id)
      .length > 0
  ) {
    throw new Error(`Vinyl with Id:${newVinyl.id} already exists`)
  }

  data.vinyls.push(newVinyl)
  fs.writeFile('./data/data.json', JSON.stringify(data))
}

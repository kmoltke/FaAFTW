export interface vinyl {
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

export async function getByCategory(category: string) {}

//
// const getData = async () => {
//   return await fs.readFile('./data/data.json')
// }
//
// export async function getAll() {
//   try {
//     const data = await getData()
//     // @ts-ignore
//     const { vinyls } = JSON.parse(data)
//
//     return vinyls
//   } catch (err) {
//     throw new Error('')
//   }
// }
//
// export async function getById(id: number) {
//   try {
//     const data = await getData()
//     // @ts-ignore
//     const { vinyls } = JSON.parse(data)
//     // @ts-ignore
//     return vinyls.filter((vinyl) => vinyl.id === id)
//   } catch (error) {}
// }
//
// export async function getByCategory(category: string) {}

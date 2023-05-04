export interface BasketProduct {
  id: number
  quantity: number
  artist: string
  album: string
  price: number
  image: string
}

export interface Basket {
  id: number
  BasketId: number
  products: BasketProduct[]
  total: number
}

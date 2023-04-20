export interface BasketProduct {
  id: number
  quantity: number
  price: number
}

export interface Basket {
  id: number
  BasketId: number
  products: BasketProduct[]
  total: number
}

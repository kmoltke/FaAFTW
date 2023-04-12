export interface BasketProduct {
  id: number
  quantity: number // eleb: added quantity
  price: number
}

export interface Basket {
  id: number
  BasketId: number
  products: BasketProduct[]
  total: number
}

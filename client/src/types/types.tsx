export interface Product {
  id: number
  artist: string
  album: string
  price: number
  image: string
  quantity: number
  decade?: string
  year?: number
  genre?: string
  type?: string
  label?: string
  description?: string
  featured?: boolean
  featuredColor?: string
}

export interface User {
  id: number
  fname: string
  lname: string
  email?: string
  password?: string
}

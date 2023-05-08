export interface Vinyl {
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
  featured?: boolean
  featuredColor?: string
  description: string
}

export interface Product {
  id: number
  artist: string
  album: string
  price: number
  image: string
  quantity: number
}

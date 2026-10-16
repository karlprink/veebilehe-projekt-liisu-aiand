export type Page = 'home' | 'menu' | 'products' | 'cart' | 'checkout' | 'success'
export type ProductCategory = 'Krookused' | 'Liiliad' | 'Nartsissid' | 'Tulbid'
export type CategoryGroup = 'Taimed' | 'Lillesibulad' | 'Seemned' | 'Aiatarvikud'
export type ProductFilter = ProductCategory | 'Kõik lillesibulad'

export interface Product {
  id: number
  name: string
  category: ProductCategory
  price: number
  image: string
}

export interface CartItem {
  product: Product
  quantity: number
}

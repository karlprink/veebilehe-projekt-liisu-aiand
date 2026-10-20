export type Page = 'home' | 'menu' | 'products' | 'cart' | 'checkout' | 'success' | 'info' | 'shop-info' | 'newsletter'
export type ProductCategory = 'Krookused' | 'Liiliad' | 'Nartsissid' | 'Tulbid'
export type CategoryGroup = 'Taimed' | 'Lillesibulad' | 'Seemned' | 'Aiatarvikud'
export type ProductFilter =
  | ProductCategory
  | 'Kõik lillesibulad'
  | 'Toataimed'
  | 'Püsikud'
  | 'Üheaastased taimed'
  | 'Lilleseemned'
  | 'Köögiviljaseemned'
  | 'Maitsetaimede seemned'
  | 'Potid ja amplid'
  | 'Muld ja väetised'
  | 'Tööriistad'
export type ProductSort = 'default' | 'name-asc' | 'price-asc' | 'price-desc'

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

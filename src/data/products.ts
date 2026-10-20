import type { Product } from '../types'
import lilyImage from '../assets/liilia.webp'

export const products: Product[] = [
  { id: 1, name: 'Krookuse sibulad', category: 'Krookused', price: 4.9, image: 'https://images.unsplash.com/photo-1469259943454-aa100abba749?auto=format&fit=crop&w=500&q=85' },
  { id: 2, name: 'Kevadine krookus', category: 'Krookused', price: 6.2, image: 'https://images.unsplash.com/photo-1469259943454-aa100abba749?auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Valge liilia', category: 'Liiliad', price: 7.5, image: lilyImage },
  { id: 4, name: 'Kuldne nartsiss', category: 'Nartsissid', price: 5.9, image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=500&q=85' },
  { id: 5, name: 'Roosa tulp', category: 'Tulbid', price: 5.5, image: 'https://images.unsplash.com/photo-1614791199038-6869a104fe5f?auto=format&fit=crop&w=500&q=85' },
  { id: 6, name: 'Kevadtulp', category: 'Tulbid', price: 4.8, image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=500&q=80' },
]

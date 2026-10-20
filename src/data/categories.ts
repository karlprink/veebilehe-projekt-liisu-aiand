import type { CategoryGroup, ProductCategory } from '../types'

export const bulbCategories: ProductCategory[] = ['Krookused', 'Liiliad', 'Nartsissid', 'Tulbid']

export const categoryItems: Record<CategoryGroup, string[]> = {
  Taimed: ['Toataimed', 'Püsikud', 'Üheaastased taimed'],
  Lillesibulad: ['Kõik lillesibulad', ...bulbCategories],
  Seemned: ['Lilleseemned', 'Köögiviljaseemned', 'Maitsetaimede seemned'],
  Aiatarvikud: ['Potid ja amplid', 'Muld ja väetised', 'Tööriistad'],
}

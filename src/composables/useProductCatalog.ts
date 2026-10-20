import { computed, ref } from 'vue'
import { products } from '../data/products'
import type { ProductFilter, ProductSort } from '../types'

export function useProductCatalog() {
  const selectedCategory = ref<ProductFilter>('Krookused')
  const productSort = ref<ProductSort>('default')
  const visibleProducts = computed(() => {
    const filtered = products.filter((product) =>
      selectedCategory.value === 'Kõik lillesibulad' || product.category === selectedCategory.value,
    )
    return [...filtered].sort((first, second) => {
      if (productSort.value === 'name-asc') return first.name.localeCompare(second.name, 'et')
      if (productSort.value === 'price-asc') return first.price - second.price
      if (productSort.value === 'price-desc') return second.price - first.price
      return first.id - second.id
    })
  })

  return { selectedCategory, productSort, visibleProducts }
}

import { computed, ref } from 'vue'
import type { CartItem, Product } from '../types'

export function useCart() {
  const items = ref<CartItem[]>([])
  const count = computed(() => items.value.reduce((total, item) => total + item.quantity, 0))
  const total = computed(() => items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0))

  function add(product: Product) {
    const existing = items.value.find((item) => item.product.id === product.id)
    if (existing) existing.quantity += 1
    else items.value.push({ product, quantity: 1 })
  }

  function changeQuantity(id: number, amount: number) {
    const item = items.value.find((entry) => entry.product.id === id)
    if (!item) return
    item.quantity += amount
    if (item.quantity <= 0) items.value = items.value.filter((entry) => entry.product.id !== id)
  }

  function clear() {
    items.value = []
  }

  return { items, count, total, add, changeQuantity, clear }
}

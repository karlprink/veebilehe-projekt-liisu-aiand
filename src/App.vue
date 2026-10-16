<script setup lang="ts">
import { computed, ref } from 'vue'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import CategoryMenu from './components/CategoryMenu.vue'
import CheckoutPage from './components/CheckoutPage.vue'
import HomePage from './components/HomePage.vue'
import ProductGrid from './components/ProductGrid.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import { products } from './data/products'
import { useCart } from './composables/useCart'
import { useNavigation } from './composables/useNavigation'
import type { CategoryGroup, Product, ProductFilter } from './types'

const { page, navigate } = useNavigation()
const { items: cart, count: cartCount, total: cartTotal, add: addToCart, changeQuantity, clear: clearCart } = useCart()
const selectedCategory = ref<ProductFilter>('Krookused')
const sortNewest = ref(false)
const expandedCategories = ref<Record<CategoryGroup, boolean>>({
  Taimed: false,
  Lillesibulad: true,
  Seemned: false,
  Aiatarvikud: false,
})

const visibleProducts = computed(() => {
  const filtered = products.filter((product) =>
    selectedCategory.value === 'Kõik lillesibulad' || product.category === selectedCategory.value,
  )
  return sortNewest.value ? [...filtered].reverse() : filtered
})

function openCategory(category: ProductFilter) {
  selectedCategory.value = category
  navigate('products')
}

function toggleCategory(category: CategoryGroup) {
  expandedCategories.value[category] = !expandedCategories.value[category]
}

function completePurchase() {
  clearCart()
  navigate('success')
}
</script>

<template>
  <main class="app-shell">
    <AppHeader :cart-count="cartCount" @toggle-menu="navigate('menu')" @go-home="navigate('home')" @go-cart="navigate('cart')" />
    <HomePage v-if="page === 'home'" @open-category="openCategory" />
    <CategoryMenu v-else-if="page === 'menu'" :expanded-categories="expandedCategories" @toggle="toggleCategory" @open-category="openCategory" />
    <ProductGrid v-else-if="page === 'products'" :category="selectedCategory" :products="visibleProducts" :sort-newest="sortNewest" @toggle-sort="sortNewest = !sortNewest" @add-to-cart="addToCart" />
    <ShoppingCart v-else-if="page === 'cart'" :items="cart" :total="cartTotal" @change-quantity="changeQuantity" @checkout="navigate('checkout')" />
    <CheckoutPage v-else-if="page === 'checkout'" @back="navigate('cart')" @submit="completePurchase" />
    <section v-else class="page success-page">
      <div class="success-card">
        <div class="success-icon">✓</div>
        <h1>Aitäh ostu eest!</h1>
        <p>Sinu tellimus on edukalt vastu võetud. Saadame kinnituse sinu e-postile.</p>
        <button @click="navigate('home')">Tagasi avalehele</button>
      </div>
    </section>
    <AppFooter />
  </main>
</template>

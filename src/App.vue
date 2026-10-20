<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
import CategoryMenu from './components/CategoryMenu.vue'
import CheckoutPage from './components/CheckoutPage.vue'
import HomePage from './components/HomePage.vue'
import InfoPage from './components/InfoPage.vue'
import NewsletterPage from './components/NewsletterPage.vue'
import ShopInfoPage from './components/ShopInfoPage.vue'
import ProductGrid from './components/ProductGrid.vue'
import ShoppingCart from './components/ShoppingCart.vue'
import { products } from './data/products'
import { useCart } from './composables/useCart'
import { useNavigation } from './composables/useNavigation'
import type { CategoryGroup, Product, ProductFilter, ProductSort } from './types'

const { page, navigate } = useNavigation()
const { items: cart, count: cartCount, total: cartTotal, add: addToCart, changeQuantity, clear: clearCart } = useCart()
const selectedCategory = ref<ProductFilter>('Krookused')
const productSort = ref<ProductSort>('default')
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
  return [...filtered].sort((first, second) => {
    if (productSort.value === 'name-asc') return first.name.localeCompare(second.name, 'et')
    if (productSort.value === 'price-asc') return first.price - second.price
    if (productSort.value === 'price-desc') return second.price - first.price
    return first.id - second.id
  })
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

async function openInfo(section: 'kontakt' | 'meist' | 'tule-toole') {
  navigate('info')
  await nextTick()
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

async function openShopInfo(section: 'muugitingimused' | 'tarneviisid' | 'tagastus' | 'garantiitingimused') {
  navigate('shop-info')
  await nextTick()
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <main class="app-shell">
    <AppHeader :cart-count="cartCount" @toggle-menu="navigate('menu')" @go-home="navigate('home')" @go-cart="navigate('cart')" />
    <HomePage v-if="page === 'home'" @open-category="openCategory" @open-newsletter="navigate('newsletter')" />
    <NewsletterPage v-else-if="page === 'newsletter'" @go-home="navigate('home')" />
    <InfoPage v-else-if="page === 'info'" />
    <ShopInfoPage v-else-if="page === 'shop-info'" />
    <CategoryMenu v-else-if="page === 'menu'" :expanded-categories="expandedCategories" @toggle="toggleCategory" @open-category="openCategory" />
    <ProductGrid v-else-if="page === 'products'" :category="selectedCategory" :products="visibleProducts" :sort="productSort" @change-sort="productSort = $event" @add-to-cart="addToCart" />
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
    <AppFooter @open-info="openInfo" @open-shop-info="openShopInfo" />
  </main>
</template>

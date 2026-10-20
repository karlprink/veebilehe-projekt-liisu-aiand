<script setup lang="ts">
import type { Product, ProductFilter, ProductSort } from '../types'

defineProps<{ category: ProductFilter; products: Product[]; sort: ProductSort }>()
const emit = defineEmits<{ changeSort: [sort: ProductSort]; addToCart: [product: Product] }>()
</script>

<template>
  <section class="page products-page">
    <h1>{{ category }}</h1>
    <div class="toolbar">
      <label for="product-sort">Sorteeri:</label>
      <select id="product-sort" :value="sort" aria-label="Sorteeri tooteid" @change="emit('changeSort', ($event.target as HTMLSelectElement).value as ProductSort)">
        <option value="default">Soovitatud</option>
        <option value="name-asc">Nime järgi (A–Ü)</option>
        <option value="price-asc">Hinna järgi (odavam enne)</option>
        <option value="price-desc">Hinna järgi (kallim enne)</option>
      </select>
    </div>
    <div v-if="products.length === 0" class="empty-products">
      <h2>Selles kategoorias tooteid ei ole</h2>
      <p>Proovi mõnda teist kategooriat või vaata hiljem uuesti.</p>
    </div>
    <div v-else class="product-grid">
      <article v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" />
        <b>{{ product.name }}</b><span class="price">{{ product.price.toFixed(2) }} €</span>
        <button @click="emit('addToCart', product)">Lisa ostukorvi</button>
      </article>
    </div>
  </section>
</template>

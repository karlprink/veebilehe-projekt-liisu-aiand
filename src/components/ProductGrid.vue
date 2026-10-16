<script setup lang="ts">
import type { Product, ProductFilter } from '../types'

defineProps<{ category: ProductFilter; products: Product[]; sortNewest: boolean }>()
const emit = defineEmits<{ toggleSort: []; addToCart: [product: Product] }>()
</script>

<template>
  <section class="page products-page">
    <h1>{{ category }}</h1>
    <div class="toolbar"><button @click="emit('toggleSort')">Filtreeri <span>⌁</span></button><button @click="emit('toggleSort')">Populaarsed enne ↕</button></div>
    <div class="product-grid">
      <article v-for="product in products" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" />
        <b>{{ product.name }}</b><span class="price">{{ product.price.toFixed(2) }} €</span>
        <button @click="emit('addToCart', product)">Lisa ostukorvi</button>
      </article>
    </div>
  </section>
</template>

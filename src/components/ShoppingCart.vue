<script setup lang="ts">
import type { CartItem } from '../types'

defineProps<{ items: CartItem[]; total: number }>()
const emit = defineEmits<{
  changeQuantity: [id: number, amount: number]
  checkout: []
}>()
</script>

<template>
  <section class="page cart-page">
    <h1>Ostukorv</h1>
    <div v-if="items.length">
      <div v-for="item in items" :key="item.product.id" class="cart-row">
        <button class="remove" @click="emit('changeQuantity', item.product.id, -item.quantity)">×</button><span class="cart-dot"></span><b>{{ item.product.name }}</b>
        <div class="quantity"><button @click="emit('changeQuantity', item.product.id, -1)">−</button><span>{{ item.quantity }}</span><button @click="emit('changeQuantity', item.product.id, 1)">+</button></div>
      </div>
    </div>
    <div v-else class="empty-cart">Sinu ostukorv on tühi.</div>
    <div class="coupon"><b>Kasuta kupongi</b><input placeholder="Sisesta kupongi kood" /></div>
    <div class="cart-total"><b>Summa: {{ total ? `${total.toFixed(2)} €` : '--.-- €' }}</b><button :disabled="!items.length" @click="emit('checkout')">Maksma</button></div>
  </section>
</template>

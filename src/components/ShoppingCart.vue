<script setup lang="ts">
import type { CartItem, DeliveryMethod } from '../types'
import { shippingPrices } from '../data/shipping'

defineProps<{ items: CartItem[]; total: number; delivery: DeliveryMethod; parcelLockerCost: number }>()
const emit = defineEmits<{
  changeQuantity: [id: number, amount: number]
  changeDelivery: [delivery: DeliveryMethod]
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
    <fieldset class="delivery-options">
      <legend>Vali transport</legend>
      <label>
        <input type="radio" name="delivery" value="parcel-locker" :checked="delivery === 'parcel-locker'" @change="emit('changeDelivery', 'parcel-locker')" />
        <span><b>Pakiautomaat</b><small>{{ items.length ? (parcelLockerCost ? `${parcelLockerCost.toFixed(2)} €` : 'Tasuta') : '—' }}</small></span>
      </label>
      <label>
        <input type="radio" name="delivery" value="courier" :checked="delivery === 'courier'" @change="emit('changeDelivery', 'courier')" />
        <span><b>Kuller</b><small>{{ items.length ? `${shippingPrices.courier.toFixed(2)} €` : '—' }}</small></span>
      </label>
    </fieldset>
    <div class="coupon"><b>Kasuta kupongi</b><input placeholder="Sisesta kupongi kood" /></div>
    <div class="cart-total">
      <div class="cart-total__breakdown">
        <span>Tooted: <b>{{ items.length ? `${(total - (delivery === 'parcel-locker' ? (parcelLockerCost || 0) : 5.99)).toFixed(2)} €` : '--.-- €' }}</b></span>
        <span>Transport: <b>{{ items.length ? (delivery === 'parcel-locker' ? (parcelLockerCost ? `${parcelLockerCost.toFixed(2)} €` : 'Tasuta') : '5.99 €') : '--.-- €' }}</b></span>
        <strong>Kokku: {{ total ? `${total.toFixed(2)} €` : '--.-- €' }}</strong>
      </div>
      <button :disabled="!items.length" @click="emit('checkout')">Maksma</button>
    </div>
  </section>
</template>

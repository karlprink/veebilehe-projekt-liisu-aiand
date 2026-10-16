<script setup lang="ts">
import { computed, reactive } from 'vue'

const emit = defineEmits<{ back: []; submit: [details: typeof form] }>()
const form = reactive({
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
})
const isValid = computed(() =>
  Object.values(form).every((value) => value.trim().length > 0),
)

function submit() {
  if (isValid.value) emit('submit', form)
}
</script>

<template>
  <section class="page checkout-page">
    <h1>Andmed maksmiseks</h1>
    <p class="checkout-intro">Lisa oma andmed, et saaksime tellimuse kinnitada ja kohale toimetada.</p>
    <form class="checkout-form" @submit.prevent="submit">
      <label>Nimi<input v-model="form.name" type="text" autocomplete="name" required /></label>
      <label>E-post<input v-model="form.email" type="email" autocomplete="email" required /></label>
      <label>Aadress<input v-model="form.address" type="text" autocomplete="street-address" required /></label>
      <div class="checkout-row">
        <label>Linn<input v-model="form.city" type="text" autocomplete="address-level2" required /></label>
        <label>Postiindeks<input v-model="form.postalCode" type="text" inputmode="numeric" autocomplete="postal-code" required /></label>
      </div>
      <div class="checkout-actions">
        <button type="button" class="button-secondary" @click="emit('back')">Tagasi ostukorvi</button>
        <button type="submit" :disabled="!isValid">Maksa</button>
      </div>
    </form>
  </section>
</template>

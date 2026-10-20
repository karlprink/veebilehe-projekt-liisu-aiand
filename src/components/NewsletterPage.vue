<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

const email = ref('')
const confirmed = ref(false)
const secondsLeft = ref(3)
const emit = defineEmits<{ goHome: [] }>()
let redirectTimer: ReturnType<typeof setTimeout> | undefined
let countdownTimer: ReturnType<typeof setInterval> | undefined

function confirmSubscription() {
  if (confirmed.value) return
  confirmed.value = true
  secondsLeft.value = 3
  countdownTimer = setInterval(() => {
    secondsLeft.value -= 1
  }, 1000)
  redirectTimer = setTimeout(() => {
    if (countdownTimer) clearInterval(countdownTimer)
    emit('goHome')
  }, 3000)
}

onBeforeUnmount(() => {
  if (redirectTimer) clearTimeout(redirectTimer)
  if (countdownTimer) clearInterval(countdownTimer)
})
</script>

<template>
  <section class="page newsletter-page">
    <div v-if="!confirmed" class="newsletter-card">
      <h1>Liitu uudiskirjaga</h1>
      <p>Saadame sulle aiandusnippe, hooajalisi soovitusi ja värskeid pakkumisi.</p>
      <form @submit.prevent="confirmSubscription">
        <label for="newsletter-email">E-posti aadress</label>
        <input id="newsletter-email" v-model="email" type="email" autocomplete="email" placeholder="sinu@email.ee" required />
        <button type="submit">Kinnita</button>
      </form>
    </div>
    <div v-else class="newsletter-card newsletter-success">
      <div class="success-icon">✓</div>
      <h1>Aitäh liitumast!</h1>
      <p>Saatsime kinnituse aadressile <strong>{{ email }}</strong>.</p>
      <p>Suundume avalehele {{ secondsLeft }} sekundi pärast.</p>
    </div>
  </section>
</template>

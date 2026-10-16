<script setup lang="ts">
defineProps<{ cartCount: number }>()

const emit = defineEmits<{
  toggleMenu: []
  goHome: []
  goCart: []
}>()
</script>

<template>
  <header class="topbar">
    <button class="icon-button menu-button" aria-label="Ava menüü" @click="emit('toggleMenu')">
      <span></span><span></span><span></span>
    </button>
    <button class="brand" @click="emit('goHome')">
      <span class="brand-mark" aria-hidden="true">✿</span><span>AIANDUSPOOD</span>
    </button>
    <button class="icon-button cart-icon" aria-label="Ostukorv" @click="emit('goCart')">
      <svg viewBox="0 0 32 30" aria-hidden="true">
        <path d="M3 5h4l3 15h14l4-11H8" />
        <circle cx="12" cy="25" r="1.7" />
        <circle cx="24" cy="25" r="1.7" />
      </svg>
      <small v-if="cartCount">{{ cartCount }}</small>
    </button>
  </header>
</template>

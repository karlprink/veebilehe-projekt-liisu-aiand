<script setup lang="ts">
import lilyImage from '../assets/liilia.webp'
import type { ProductFilter } from '../types'

const emit = defineEmits<{
  openCategory: [category: ProductFilter]
  openNewsletter: []
}>()
</script>

<template>
  <section class="page home-page">
    <div class="hero">
      <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85" alt="Värvilised kevadlilled" />
      <div class="hero-copy"><strong>Kevadine värv<br />algab siit</strong><button @click="emit('openCategory', 'Kõik lillesibulad')">Avasta lillesibulad</button></div>
    </div>
    <section class="offers">
      <h2>Lillesibulad sinu aeda</h2>
      <div class="offer-grid">
        <button @click="emit('openCategory', 'Krookused')"><img src="https://images.unsplash.com/photo-1469259943454-aa100abba749?auto=format&fit=crop&w=500&q=85" alt="Lillad krookused" /><span>Krookused</span></button>
        <button @click="emit('openCategory', 'Nartsissid')"><img src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=500&q=85" alt="Kollased nartsissid" /><span>Nartsissid</span></button>
        <button @click="emit('openCategory', 'Liiliad')"><img :src="lilyImage" alt="Valged liiliad" /><span>Liiliad</span></button>
      </div>
    </section>
    <div class="shipping-banner">
      <img src="https://images.unsplash.com/photo-1469259943454-aa100abba749?auto=format&fit=crop&w=1200&q=85" alt="" />
      <span>Ostes e-poest vähemalt 30 € eest, on transport pakiautomaati <strong>TASUTA!</strong></span>
    </div>
    <div class="newsletter">
      <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80" alt="Hoolitsetud koduaed" />
      <div><strong>Kasvata oma aed<br />veelgi kaunimaks</strong><button @click="emit('openNewsletter')">Liitu uudiskirjaga →</button></div>
    </div>
    <section class="night-garden"><h2>Head nõuanded aednikule</h2><p>Sügis on ideaalne aeg kevadise õiteilu planeerimiseks. Istuta lillesibulad enne külmade saabumist ja naudi esimesi värve juba uuel hooajal.</p></section>
  </section>
</template>

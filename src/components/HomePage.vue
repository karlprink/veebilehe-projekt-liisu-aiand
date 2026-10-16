<script setup lang="ts">
import type { ProductFilter } from '../types'

const emit = defineEmits<{ openCategory: [category: ProductFilter] }>()
</script>

<template>
  <section class="page home-page">
    <div class="hero">
      <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85" alt="Värvilised kevadlilled" />
      <div class="hero-copy"><strong>KEVADINE VÄRV<br />ALGAB SIIT</strong><button @click="emit('openCategory', 'Tulbid')">Avasta lillesibulad</button></div>
    </div>
    <section class="offers">
      <h2>Lillesibulad sinu aeda</h2>
      <div class="offer-grid">
        <button @click="emit('openCategory', 'Krookused')"><img src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=300&q=80" alt="Krookused" /><span>Krookused</span></button>
        <button @click="emit('openCategory', 'Nartsissid')"><img src="https://images.unsplash.com/photo-1455582916367-25f75bfc6710?auto=format&fit=crop&w=300&q=80" alt="Nartsissid" /><span>Nartsissid</span></button>
        <button @click="emit('openCategory', 'Liiliad')"><img src="https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=300&q=80" alt="Liiliad" /><span>Liiliad</span></button>
      </div>
    </section>
    <div class="newsletter">
      <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80" alt="Hoolitsetud koduaed" />
      <div><strong>Kasvata oma aed<br />veelgi kaunimaks</strong><button>Liitu uudiskirjaga →</button></div>
    </div>
    <section class="night-garden"><h2>Head nõuanded aednikule</h2><p>Sügis on ideaalne aeg kevadise õiteilu planeerimiseks. Istuta lillesibulad enne külmade saabumist ja naudi esimesi värve juba uuel hooajal.</p></section>
  </section>
</template>

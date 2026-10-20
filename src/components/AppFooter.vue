<script setup lang="ts">
const emit = defineEmits<{
  openInfo: [section: 'kontakt' | 'meist' | 'tule-toole']
  openShopInfo: [section: 'muugitingimused' | 'tarneviisid' | 'tagastus' | 'garantiitingimused']
}>()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="footer-column">
        <h2>Ettevõte</h2>
        <a href="#kontakt" @click.prevent="emit('openInfo', 'kontakt')">Kontakt</a>
        <a href="#meist" @click.prevent="emit('openInfo', 'meist')">Meist</a>
        <a href="#">Istikuärid</a>
        <a href="#tule-toole" @click.prevent="emit('openInfo', 'tule-toole')">Tule tööle!</a>
      </div>
      <div class="footer-column">
        <h2>E-pood</h2>
        <a href="#muugitingimused" @click.prevent="emit('openShopInfo', 'muugitingimused')">Müügitingimused</a>
        <a href="#tarneviisid" @click.prevent="emit('openShopInfo', 'tarneviisid')">Tarneviisid</a>
        <a href="#tagastus" @click.prevent="emit('openShopInfo', 'tagastus')">Tagastus</a>
        <a href="#garantiitingimused" @click.prevent="emit('openShopInfo', 'garantiitingimused')">Garantiitingimused</a>
      </div>
      <div class="footer-column footer-social">
        <h2>Jälgi meid</h2>
        <a href="#" aria-label="Facebook" class="social-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h2.7l.4-3H14V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a21 21 0 0 0-2.4-.1c-2.7 0-4.4 1.6-4.4 4.5V10H7.8v3h2.7v8H14Z" /></svg>
        </a>
        <a href="#" aria-label="Instagram" class="social-icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" /><circle cx="12" cy="12" r="3.5" /><circle cx="17.3" cy="6.8" r="1" class="social-dot" /></svg>
        </a>
      </div>
    </div>
  </footer>
</template>

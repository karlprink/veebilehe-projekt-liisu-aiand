<script setup lang="ts">
import type { InfoSection } from '../data/infoPages'

defineProps<{ title: string; intro: string; sections: InfoSection[] }>()
</script>

<template>
  <section class="page info-page">
    <h1>{{ title }}</h1>
    <p class="info-intro">{{ intro }}</p>
    <article v-for="section in sections" :id="section.id" :key="section.id" class="info-section">
      <h2>{{ section.title }}</h2>
      <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
      <a v-for="link in section.links" :key="link.href" :href="link.href">{{ link.label }}</a>
    </article>
  </section>
</template>

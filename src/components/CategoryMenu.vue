<script setup lang="ts">
import type { CategoryGroup, ProductCategory, ProductFilter } from '../types'

const props = defineProps<{ expandedCategories: Record<CategoryGroup, boolean> }>()
const emit = defineEmits<{
  toggle: [category: CategoryGroup]
  openCategory: [category: ProductFilter]
}>()

const categories: ProductCategory[] = ['Krookused', 'Liiliad', 'Nartsissid', 'Tulbid']
const icon = (category: 'Taimed' | 'Lillesibulad' | 'Seemned' | 'Aiatarvikud') =>
  ({ Taimed: '♧', Lillesibulad: '✿', Seemned: '●', Aiatarvikud: '⚒' })[category]
</script>

<template>
  <section class="page menu-page">
    <h1>Menüü</h1>
    <div v-for="(subItems, category) in {
      Taimed: ['Toataimed', 'Püsikud', 'Üheaastased taimed'],
      Lillesibulad: ['Kõik lillesibulad', ...categories],
      Seemned: ['Lilleseemned', 'Köögiviljaseemned', 'Maitsetaimede seemned'],
      Aiatarvikud: ['Potid ja amplid', 'Muld ja väetised', 'Tööriistad'],
    }" :key="category" class="menu-group">
      <button class="menu-row" :class="{ active: props.expandedCategories[category] }" @click="emit('toggle', category)">
        <span class="round-icon">{{ icon(category as 'Taimed' | 'Lillesibulad' | 'Seemned' | 'Aiatarvikud') }}</span>
        <b>{{ category }}</b><span class="menu-chevron" :class="{ expanded: props.expandedCategories[category] }"></span>
      </button>
      <div v-if="props.expandedCategories[category]" class="menu-subgroup">
        <button v-for="item in subItems" :key="item" class="sub-row"
          @click="category === 'Lillesibulad' ? emit('openCategory', item as ProductFilter) : undefined">
          {{ item }} <span class="sub-chevron"></span>
        </button>
      </div>
    </div>
  </section>
</template>

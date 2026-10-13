<script setup lang="ts">
interface ProductSummary {
  id: number
  name: string
}

defineProps<{
  productTypes: string[]
  selectedType: string
  categories: string[]
  selectedCategory: string
  filteredProducts: ProductSummary[]
}>()

const emit = defineEmits<{
  'update:selected-type': [value: string]
  'update:selected-category': [value: string]
  'select-product': [productId: number]
}>()
</script>

<template>
  <aside class="catalog-sidebar">
    <h2>Toodete valik</h2>

    <details class="accordion" open>
      <summary>Tootetüüp</summary>
      <div class="accordion__content option-list">
        <label v-for="type in productTypes" :key="type" class="option">
          <input
            :checked="selectedType === type"
            type="radio"
            name="product-type"
            @change="emit('update:selected-type', type)"
          />
          {{ type }}
        </label>
      </div>
    </details>

    <details class="accordion" open>
      <summary>Kategooria</summary>
      <div class="accordion__content option-list">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="option-button"
          :class="{ 'option-button--active': category === selectedCategory }"
          @click="emit('update:selected-category', category)"
        >
          {{ category }}
        </button>
      </div>
    </details>

    <details class="accordion" open>
      <summary>Vali toode</summary>
      <div class="accordion__content option-list">
        <button
          v-for="product in filteredProducts"
          :key="product.id"
          type="button"
          class="option-button"
          @click="emit('select-product', product.id)"
        >
          {{ product.name }}
        </button>
      </div>
    </details>
  </aside>
</template>

<style scoped>
.catalog-sidebar {
  border: 1px solid #d8e0d8;
  border-radius: 10px;
  background: #f8fbf8;
  padding: 0.75rem;
  align-self: start;
}

.accordion {
  border: 1px solid #d7dfd7;
  background: #fff;
  border-radius: 8px;
  margin-top: 0.55rem;
}

.accordion summary {
  list-style: none;
  cursor: pointer;
  font-weight: 700;
  padding: 0.65rem 0.75rem;
}

.accordion summary::-webkit-details-marker {
  display: none;
}

.accordion__content {
  border-top: 1px solid #d7dfd7;
  padding: 0.65rem 0.75rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.option-list {
  display: grid;
  gap: 0.45rem;
}

.option-button {
  text-align: left;
  background: #f0f5f0;
  color: #253525;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 0.9rem;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.option-button--active {
  background: #3d8b5d;
  color: #fff;
}
</style>

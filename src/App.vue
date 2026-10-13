<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductSidebar from './components/ProductSidebar.vue'

type Page = 'catalog' | 'fitCheck' | 'afterAdd' | 'cart' | 'checkout' | 'payment' | 'success'
type ProductType = 'Lillesibulad'
type Category = 'Tulbid' | 'Nartsissid' | 'Liiliad'

interface Product {
  id: number
  name: string
  type: ProductType
  category: Category
  price: number
  image: string
}

interface NewsItem {
  id: number
  title: string
  text: string
  image: string
}

interface CartItem {
  product: Product
  qty: number
}

const page = ref<Page>('catalog')

const productTypes: ProductType[] = ['Lillesibulad']
const categories: Category[] = ['Tulbid', 'Nartsissid', 'Liiliad']

const products: Product[] = [
  {
    id: 1,
    name: 'Punane tulp',
    type: 'Lillesibulad',
    category: 'Tulbid',
    price: 4.9,
    image:
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Kollane tulp',
    type: 'Lillesibulad',
    category: 'Tulbid',
    price: 5.2,
    image:
      'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Valge nartsiss',
    type: 'Lillesibulad',
    category: 'Nartsissid',
    price: 4.5,
    image:
      'https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Roosa liilia',
    type: 'Lillesibulad',
    category: 'Liiliad',
    price: 6.3,
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80',
  },
]

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Sügisene sibulate kampaania',
    text: 'Vali lemmiksibulad ja saa mitme paki ostul soodushind.',
    image:
      'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Uued liilia sordid',
    text: 'Lisandus valik uusi liiliaid, mis sobivad hästi terrassile ja peenrasse.',
    image:
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Aiandusnõuanded nädalaks',
    text: 'Tutvu soovitustega, kuidas sibulaid õigesti istutada ja hooldada.',
    image:
      'https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1200&q=80',
  },
]

const selectedType = ref<ProductType>('Lillesibulad')
const selectedCategory = ref<Category>('Tulbid')
const selectedProduct = ref<Product | null>(null)
const cart = ref<CartItem[]>([])
const paymentMethod = ref<'Kaardimakse' | 'Pangaülekanne'>('Kaardimakse')

const checkoutForm = ref({
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
})

const filteredProducts = computed(() =>
  products.filter(
    (item) => item.type === selectedType.value && item.category === selectedCategory.value,
  ),
)

const cartTotal = computed(() =>
  cart.value.reduce((sum, item) => sum + item.product.price * item.qty, 0),
)

const cartItemCount = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0))

const isCheckoutValid = computed(
  () =>
    checkoutForm.value.name.trim() &&
    checkoutForm.value.email.trim() &&
    checkoutForm.value.address.trim() &&
    checkoutForm.value.city.trim() &&
    checkoutForm.value.postalCode.trim(),
)

function chooseProduct(product: Product) {
  selectedProduct.value = product
  page.value = 'fitCheck'
}

function chooseProductById(productId: number) {
  const product = products.find((item) => item.id === productId)
  if (!product) return
  chooseProduct(product)
}

function setSelectedType(value: string) {
  if (productTypes.includes(value as ProductType)) {
    selectedType.value = value as ProductType
  }
}

function setSelectedCategory(value: string) {
  if (categories.includes(value as Category)) {
    selectedCategory.value = value as Category
  }
}

function addSelectedProductToCart() {
  if (!selectedProduct.value) return

  const existing = cart.value.find((item) => item.product.id === selectedProduct.value?.id)
  if (existing) {
    existing.qty += 1
  } else {
    cart.value.push({ product: selectedProduct.value, qty: 1 })
  }

  page.value = 'afterAdd'
}

function continueShopping() {
  selectedProduct.value = null
  page.value = 'catalog'
}

function increaseQty(itemId: number) {
  const item = cart.value.find((entry) => entry.product.id === itemId)
  if (item) item.qty += 1
}

function decreaseQty(itemId: number) {
  const item = cart.value.find((entry) => entry.product.id === itemId)
  if (!item) return

  if (item.qty === 1) {
    cart.value = cart.value.filter((entry) => entry.product.id !== itemId)
    return
  }
  item.qty -= 1
}

function goToPayment() {
  if (!isCheckoutValid.value) return
  page.value = 'payment'
}

function finishPayment() {
  page.value = 'success'
}

function startNewOrder() {
  page.value = 'catalog'
  selectedProduct.value = null
  cart.value = []
  paymentMethod.value = 'Kaardimakse'
  checkoutForm.value = {
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  }
}
</script>

<template>
  <main>
    <header class="site-header">
      <div class="site-header__inner">
        <div>
          <p class="site-header__title">Liisu Aiand</p>
          <p class="site-header__subtitle">Kodumaine aiandus e-pood</p>
        </div>
        <nav class="site-header__nav">
          <a href="#" @click.prevent="page = 'catalog'">Avaleht</a>
          <a href="#" @click.prevent="page = 'catalog'">Tooted</a>
          <button class="cart-button" @click="page = 'cart'">
            Ostukorv <span>{{ cartItemCount }}</span>
          </button>
        </nav>
      </div>
    </header>

    <div class="shop">
      <section class="hero">
        <div class="hero__content">
          <h2>Too kevad oma aeda</h2>
          <p>
            Vali sobiv tootetüüp, filtreeri kategooria ja liigu mugavalt ostuni vastavalt
            kasutajateekonnale.
          </p>
          <button @click="page = 'catalog'">Alusta ostlemist</button>
        </div>
        <img
          class="hero__image"
          src="https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=1400&q=80"
          alt="Kevadlilled aias"
        />
      </section>

      <section class="panel news">
        <h2>Uudised</h2>
        <div class="news-grid">
          <article v-for="item in newsItems" :key="item.id" class="news-card">
            <img :src="item.image" :alt="item.title" class="news-card__image" />
            <div class="news-card__content">
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </article>
        </div>
      </section>

      <section v-if="page === 'catalog'" class="panel">
        <div class="catalog-layout">
          <ProductSidebar
            :product-types="productTypes"
            :selected-type="selectedType"
            :categories="categories"
            :selected-category="selectedCategory"
            :filtered-products="filteredProducts"
            @update:selected-type="setSelectedType"
            @update:selected-category="setSelectedCategory"
            @select-product="chooseProductById"
          />

          <div>
            <h2>{{ selectedCategory }} tooted</h2>
            <div class="products">
              <article v-for="product in filteredProducts" :key="product.id" class="product-card">
                <img :src="product.image" :alt="product.name" class="product-image" />
                <h3>{{ product.name }}</h3>
                <p class="meta">{{ product.category }}</p>
                <p class="price">{{ product.price.toFixed(2) }} €</p>
                <button @click="chooseProduct(product)">Vali toode</button>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section v-else-if="page === 'fitCheck'" class="panel">
      <h2>Kas toode sobib?</h2>
      <p v-if="selectedProduct">
        Valitud toode: <strong>{{ selectedProduct.name }}</strong> ({{ selectedProduct.price.toFixed(2) }} €)
      </p>
      <div class="actions">
        <button @click="addSelectedProductToCart">Jah, lisa ostukorvi</button>
        <button class="button--secondary" @click="continueShopping">
          Ei, mine tagasi toodete valikusse
        </button>
      </div>
    </section>

      <section v-else-if="page === 'afterAdd'" class="panel">
        <h2>Toode lisatud ostukorvi</h2>
        <p>Kas lähed ostukorvi või jätkad ostlemist?</p>
        <div class="actions">
          <button @click="page = 'cart'">Ostukorvi</button>
          <button class="button--secondary" @click="continueShopping">Jätkan ostlemist</button>
        </div>
      </section>

      <section v-else-if="page === 'cart'" class="panel">
        <h2>Ostukorv</h2>

        <div v-if="cart.length" class="cart">
          <div v-for="item in cart" :key="item.product.id" class="cart-row">
            <div>
              <strong>{{ item.product.name }}</strong>
              <p>{{ item.product.price.toFixed(2) }} € / tk</p>
            </div>
            <div class="qty">
              <button class="button--small" @click="decreaseQty(item.product.id)">-</button>
              <span>{{ item.qty }}</span>
              <button class="button--small" @click="increaseQty(item.product.id)">+</button>
            </div>
          </div>

          <p class="total">Kokku: {{ cartTotal.toFixed(2) }} €</p>
        </div>
        <p v-else>Ostukorv on tühi.</p>

        <div class="actions">
          <button class="button--secondary" @click="page = 'catalog'">Tagasi ostlema</button>
          <button :disabled="!cart.length" @click="page = 'checkout'">Täida andmed</button>
        </div>
      </section>

      <section v-else-if="page === 'checkout'" class="panel">
        <h2>Täida andmed</h2>
        <form class="form" @submit.prevent="goToPayment">
          <label>
            Nimi
            <input v-model="checkoutForm.name" type="text" />
          </label>
          <label>
            E-post
            <input v-model="checkoutForm.email" type="email" />
          </label>
          <label>
            Aadress
            <input v-model="checkoutForm.address" type="text" />
          </label>
          <label>
            Linn
            <input v-model="checkoutForm.city" type="text" />
          </label>
          <label>
            Postiindeks
            <input v-model="checkoutForm.postalCode" type="text" />
          </label>

          <div class="actions">
            <button type="button" class="button--secondary" @click="page = 'cart'">Tagasi ostukorvi</button>
            <button type="submit">Jätka maksmisele</button>
          </div>
        </form>
      </section>

      <section v-else-if="page === 'payment'" class="panel">
        <h2>Maksa</h2>
        <label>
          Makseviis
          <select v-model="paymentMethod">
            <option value="Kaardimakse">Kaardimakse</option>
            <option value="Pangaülekanne">Pangaülekanne</option>
          </select>
        </label>
        <p>Makstav summa: <strong>{{ cartTotal.toFixed(2) }} €</strong></p>

        <div class="actions">
          <button class="button--secondary" @click="page = 'checkout'">Tagasi andmete juurde</button>
          <button @click="finishPayment">Maksa</button>
        </div>
      </section>

      <section v-else class="panel success">
        <h2>Ost on tehtud</h2>
        <p>Aitäh tellimuse eest! Kinnitus saadetakse e-posti aadressile.</p>
        <button @click="startNewOrder">Tagasi avalehele</button>
      </section>

      <footer class="footer">
        <div class="footer-table">
          <div class="footer-head">Ettevõte</div>
          <div class="footer-head">E-pood</div>
          <div class="footer-head">Jälgi meid</div>

          <div class="footer-cell">
            <a href="#">Kontakt</a>
            <a href="#">Meist</a>
            <a href="#">Istikuärid</a>
            <a href="#">Tule tööle</a>
          </div>
          <div class="footer-cell">
            <a href="#">Müügitingimused</a>
            <a href="#">Tarneviisid</a>
            <a href="#">Tagastamine</a>
            <a href="#">Garantii tingimused</a>
          </div>
          <div class="footer-cell footer-cell--social">
            <a href="#" aria-label="Facebook" class="social-link">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.6 1.6-1.6h1.4V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4V11H8v3h2.4v7h3.1Z"
                />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" class="social-link">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 7.8a4.2 4.2 0 1 0 0 8.4 4.2 4.2 0 0 0 0-8.4Zm0 6.9a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4ZM17.3 7.6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                />
                <path
                  d="M12 3.9c2.6 0 2.9 0 3.9.1 1 .1 1.6.2 2 .4a3.3 3.3 0 0 1 1.9 1.9c.2.4.3 1 .4 2 .1 1 .1 1.3.1 3.9s0 2.9-.1 3.9c-.1 1-.2 1.6-.4 2a3.3 3.3 0 0 1-1.9 1.9c-.4.2-1 .3-2 .4-1 .1-1.3.1-3.9.1s-2.9 0-3.9-.1c-1-.1-1.6-.2-2-.4a3.3 3.3 0 0 1-1.9-1.9c-.2-.4-.3-1-.4-2C3.9 15 3.9 14.7 3.9 12s0-2.9.1-3.9c.1-1 .2-1.6.4-2a3.3 3.3 0 0 1 1.9-1.9c.4-.2 1-.3 2-.4 1-.1 1.3-.1 3.9-.1Zm0-1.5c-2.6 0-3 0-4 .1-1 .1-1.9.2-2.7.6a4.8 4.8 0 0 0-2.8 2.8c-.4.8-.5 1.7-.6 2.7C1.9 9 1.9 9.4 1.9 12c0 2.6 0 3 .1 4 .1 1 .2 1.9.6 2.7a4.8 4.8 0 0 0 2.8 2.8c.8.4 1.7.5 2.7.6 1 .1 1.4.1 4 .1 2.6 0 3 0 4-.1 1-.1 1.9-.2 2.7-.6a4.8 4.8 0 0 0 2.8-2.8c.4-.8.5-1.7.6-2.7.1-1 .1-1.4.1-4 0-2.6 0-3-.1-4-.1-1-.2-1.9-.6-2.7a4.8 4.8 0 0 0-2.8-2.8c-.8-.4-1.7-.5-2.7-.6-1-.1-1.4-.1-4-.1Z"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  </main>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: #ffffffed;
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #d9e1d9;
}

.site-header__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.site-header__title {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.2;
}

.site-header__subtitle {
  color: #4f634f;
  font-size: 0.9rem;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.site-header__nav a {
  text-decoration: none;
  color: #243224;
  font-weight: 600;
}

.cart-button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.cart-button span {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #ecf6ee;
  color: #1f5b38;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.shop {
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem;
  display: grid;
  gap: 1rem;
}

h2 {
  font-size: clamp(1.2rem, 2.3vw, 1.7rem);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

h3 {
  font-weight: 600;
}

.hero {
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(120deg, #ecf6ee 0%, #f7fcf8 100%);
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  border: 1px solid #d8e0d8;
}

.hero__content {
  padding: 1.2rem;
  display: grid;
  align-content: center;
  gap: 0.7rem;
}

.hero__content h2 {
  margin: 0;
}

.hero__image {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
}

.panel {
  background: #fff;
  border: 1px solid #d8e0d8;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
}

.news {
  display: grid;
  gap: 0.85rem;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.75rem;
}

.news-card {
  border: 1px solid #d8e2d8;
  border-radius: 10px;
  overflow: hidden;
  background: #fafdfa;
}

.news-card__image {
  width: 100%;
  height: 130px;
  object-fit: cover;
}

.news-card__content {
  padding: 0.7rem;
  display: grid;
  gap: 0.35rem;
}

label {
  display: grid;
  gap: 0.3rem;
  font-weight: 600;
}

select,
input {
  border: 1px solid #c9d6c9;
  border-radius: 8px;
  padding: 0.55rem 0.65rem;
  font: inherit;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
}

.catalog-layout {
  display: grid;
  grid-template-columns: minmax(240px, 280px) 1fr;
  gap: 1rem;
}

.product-card {
  border: 1px solid #d7dfd7;
  border-radius: 10px;
  background: #fafdfa;
  display: grid;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 130px;
  object-fit: cover;
}

.product-card h3,
.product-card .meta,
.product-card .price,
.product-card button {
  margin-left: 0.85rem;
  margin-right: 0.85rem;
}

.product-card h3 {
  margin-top: 0.75rem;
}

.product-card button {
  margin-bottom: 0.85rem;
}

.meta {
  color: #526152;
}

.price {
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.9rem;
}

button {
  border: none;
  border-radius: 8px;
  background: #3d8b5d;
  color: #fff;
  padding: 0.6rem 0.9rem;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button--secondary {
  background: #f1f3f1;
  color: #2b342b;
}

.button--small {
  width: 30px;
  height: 30px;
  padding: 0;
}

.cart {
  display: grid;
  gap: 0.7rem;
}

.cart-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #e4e9e4;
  padding-bottom: 0.6rem;
}

.qty {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.total {
  font-size: 1.1rem;
  font-weight: 700;
}

.form {
  display: grid;
  gap: 0.65rem;
}

.success {
  border-color: #7bb68d;
  background: #f4fbf6;
}

.footer {
  margin-top: 0.25rem;
}

.footer-table {
  border: 1px solid #d7dfd7;
  border-radius: 12px;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(3, minmax(180px, 1fr));
}

.footer-head {
  background: #3d8b5d;
  color: #fff;
  padding: 0.75rem;
  font-weight: 700;
  border-right: 1px solid rgba(255, 255, 255, 0.35);
}

.footer-head:nth-child(3) {
  border-right: 0;
}

.footer-cell {
  display: grid;
  gap: 0.55rem;
  padding: 0.85rem;
  border-top: 1px solid #d7dfd7;
  border-right: 1px solid #d7dfd7;
  background: #fff;
}

.footer-cell:last-child {
  border-right: 0;
}

.footer-cell a {
  color: #243224;
  text-decoration: none;
}

.footer-cell a:hover {
  text-decoration: underline;
}

.footer-cell--social {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
}

.social-link {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #eef4ee;
}

.social-link svg {
  width: 23px;
  height: 23px;
  fill: #2f6f4a;
}

@media (max-width: 600px) {
  .site-header__inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .site-header__nav {
    width: 100%;
    justify-content: space-between;
  }

  .panel {
    padding: 0.85rem;
  }

  .cart-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero {
    grid-template-columns: 1fr;
  }

  .hero__image {
    min-height: 180px;
  }

  .footer-table {
    grid-template-columns: 1fr;
  }

  .footer-head,
  .footer-cell {
    border-right: 0;
  }

  .catalog-layout {
    grid-template-columns: 1fr;
  }
}
</style>

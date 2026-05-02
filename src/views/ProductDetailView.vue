<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { cart } from '@/stores/cart'
import axios from 'axios'
import { StarIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const productId = computed(() => route.params.id)
const product = ref()
const isLoading = ref(false)
const getProductDetail = async () => {
  try {
    isLoading.value = true
    const response = await axios.get(`https://fakestoreapi.com/products/${productId.value}`)
    product.value = response.data
  } catch (error) {
    console.error('Gagal mengambil detail produk:', error)
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  getProductDetail()
})
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-12 mt-10">
    <div v-if="isLoading" class="flex justify-center items-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-200 border-t-slate-900 rounded-full animate-spin"
      ></div>
    </div>
    <template v-else-if="product">
      <!-- Breadcrumb -->
      <div class="text-sm text-gray-500 mb-6">
        <RouterLink to="/" class="hover:text-gray-800">Home</RouterLink>
        <span class="mx-2">/</span>
        <span class="text-gray-800 font-medium">{{ product.title }}</span>
      </div>

      <!-- Grid: Foto + Info -->
      <div class="grid md:grid-cols-2 gap-10 items-start">
        <!-- Foto produk -->
        <div class="bg-white rounded-xl overflow-hidden p-6">
          <img :src="product.image" :alt="product.title" class="w-full h-96 object-contain" />
        </div>

        <!-- Info produk -->
        <div class="space-y-4">
          <h1 class="text-3xl font-bold">{{ product.title }}</h1>

          <!-- Rating dari API -->
          <div class="flex items-center gap-1 text-yellow-500">
            <StarIcon class="w-5 h-5" />
            <!-- ulangi 5x -->
            <span class="text-sm text-gray-500 ml-2">
              {{ product.rating?.rate }} ({{ product.rating?.count }} reviews)
            </span>
          </div>

          <p class="text-sm text-gray-500 capitalize">{{ product.category }}</p>
          <p class="text-2xl font-semibold text-slate-900">${{ product.price }}</p>
          <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>

          <!-- Tombol action -->
          <div class="flex gap-4 pt-4">
            <button
              @click="
                cart.add({
                  id: product.id,
                  name: product.title,
                  price: product.price,
                  image: product.image,
                })
              "
              class="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              Add to Cart
            </button>
            <button class="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="text-center py-20">
      <p class="text-gray-500 text-lg">Produk tidak ditemukan</p>
      <RouterLink to="/" class="text-blue-600 hover:underline mt-4 inline-block">
        ← Kembali ke Home
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { cart } from '@/stores/cart'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false)
const showSuccessModal = ref(false)

// Ambil barang dari cart store
const cartItems = computed(() => cart.state.items)

// Cek apakah keranjang ada isinya (asumsi cart.state.items berupa array)
const isCartEmpty = computed(() => {
  return !cartItems.value || cartItems.value.length === 0
})

function handleSubmit() {
  if (isCartEmpty.value) return // Jangan proses jika keranjang kosong

  isSubmitting.value = true

  setTimeout(() => {
    isSubmitting.value = false
    cart.state.items = [] // kosongkan keranjang
    showSuccessModal.value = true
  }, 1500)
}

function closeModalAndRedirect() {
  showSuccessModal.value = false
  router.push('/')
}
</script>

<template>
  <section class="min-h-[80vh] flex items-center justify-center px-4 mt-16 bg-gray-50/30">
    <div class="max-w-xl mx-auto w-full">
      <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-8 space-y-6">
        <div class="text-center border-b border-gray-100 pb-4">
          <h1 class="text-2xl font-bold text-gray-900">Ringkasan Pesanan</h1>
          <p class="text-gray-500 mt-1 text-sm">Pastikan barang yang kamu beli sudah benar</p>
        </div>

        <div v-if="!isCartEmpty" class="space-y-3 max-h-72 overflow-y-auto pr-2">
          <div
            v-for="item in cart.state.items"
            :key="item.id"
            class="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100"
          >
            <img
              :src="item.image"
              class="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-gray-100"
            />

            <div class="flex-1">
              <p class="font-semibold text-gray-800 line-clamp-1 text-sm">{{ item.name }}</p>
              <p class="text-xs text-gray-500 mt-1">
                {{ item.qty }}x @ {{ cart.formatPrice(item.price) }}
              </p>
            </div>

            <div class="font-semibold text-gray-900 text-sm">
              {{ cart.formatPrice(item.price * item.qty) }}
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8">
          <p class="text-red-500 text-sm mb-3">Wah, keranjangmu masih kosong nih.</p>
          <RouterLink to="/" class="text-sm font-medium text-blue-600 hover:underline">
            Yuk belanja dulu
          </RouterLink>
        </div>

        <div class="border-t border-gray-100 pt-4 space-y-3">
          <div class="flex justify-between text-gray-500 text-sm">
            <span>Total Item</span>
            <span>{{ cart.totalItems }} barang</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-base font-medium text-gray-700">Total Pembayaran</span>
            <span class="text-2xl font-bold text-slate-900">{{
              cart.formatPrice(cart.totalPrice.value)
            }}</span>
          </div>
        </div>

        <button
          @click="handleSubmit"
          :disabled="isSubmitting || isCartEmpty"
          class="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <span v-if="isSubmitting" class="animate-pulse">Memproses Pembayaran...</span>
          <span v-else>Bayar Sekarang</span>
        </button>
      </div>
    </div>
  </section>

  <div
    v-if="showSuccessModal"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-2xl p-8 max-w-sm w-full text-center space-y-4 shadow-xl">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 class="text-xl font-bold text-gray-900">Pesanan Berhasil!</h2>
      <p class="text-gray-500 text-sm">
        Terima kasih sudah belanja. Pesananmu sedang diproses dan akan segera dikirim.
      </p>

      <button
        @click="closeModalAndRedirect"
        class="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition"
      >
        Kembali ke Home
      </button>
    </div>
  </div>
</template>

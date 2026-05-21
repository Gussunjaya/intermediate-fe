<script setup>
import { auth } from '@/stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Semua field form dibundel dalam satu reactive object
const form = reactive({
  email: '',
  password: '',
})

// State untuk loading dan toggle password
const isSubmitting = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const falsePassword = ref(false) // Password dummy untuk validasi

async function handleSubmit() {
  errorMessage.value = '' // reset error setiap kali submit
  isSubmitting.value = true

  setTimeout(() => {
    // Panggil fungsi login dari auth store
    const success = auth.login(form.email, form.password)
    isSubmitting.value = false
    if (success) {
      router.push('/') // login berhasil, redirect ke home
    } else {
      // Login gagal, tampilkan pesan error
      errorMessage.value = 'Email atau password salah. Coba: admin@toko.com / admin123'
      falsePassword.value = true // trigger tampilan error pada input password
    }
  }, 1200)
}
</script>
<template>
  <section class="min-h-[80vh] flex items-center justify-center px-4 mt-16">
    <div class="max-w-md mx-auto w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Masuk</h1>
        <p class="text-gray-500 mt-2">Masuk ke akun kamu untuk melanjutkan belanja.</p>
      </div>

      <!-- Form Card -->
      <form
        @submit.prevent="handleSubmit"
        class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 p-8 space-y-6"
      >
        <!-- Pesan error jika login gagal -->
        <div
          v-if="errorMessage"
          class="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3"
        >
          {{ errorMessage }}
        </div>
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1"> Email </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="contoh@email.com"
            class="w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition border-gray-300"
          />
        </div>

        <!-- Password Field dengan Toggle -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Minimal 6 karakter"
              :class="
                'w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition ' +
                (falsePassword ? 'border-red-500' : 'border-gray-300')
              "
            />
            <p class="text-red-500 text-sm mt-1" v-if="falsePassword">Password salah</p>
            <button
              type="button"
              @click="showPassword = !showPassword"
              :class="[
                'absolute right-3 text-gray-400 hover:text-gray-600 text-sm',
                falsePassword ? 'top-1 translate-y-1/4' : 'top-1/2 -translate-y-1/2',
              ]"
            >
              {{ showPassword ? 'Tutup' : 'Lihat' }}
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting">Memproses...</span>
          <span v-else>Masuk</span>
        </button>
      </form>
    </div>
  </section>
</template>

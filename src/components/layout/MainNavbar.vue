<script setup>
import {
  MagnifyingGlassIcon,
  HeartIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'
import { cart } from '@/stores/cart'
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)
</script>

<template>
  <header class="border-b border-gray-200 bg-white fixed top-0 left-0 w-full z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- LOGO -->
        <div class="flex items-center">
          <img src="/src/assets/images/logo.png" alt="Logo" class="h-9 w-auto rounded-3xl" />
        </div>

        <!-- DESKTOP MENU -->
        <nav class="hidden md:flex items-center gap-x-8 font-medium text-sm">
          <a href="#" class="hover:text-black transition-colors">Pria</a>
          <a href="#" class="hover:text-black transition-colors">Wanita</a>
          <a href="#" class="hover:text-black transition-colors">Anak - Anak</a>
          <a href="#" class="hover:text-black transition-colors">Promo</a>
          <a href="#" class="hover:text-black transition-colors">New & Featured</a>
        </nav>

        <!-- RIGHT SIDE: Search + Icons -->
        <div class="flex items-center gap-x-2 sm:gap-x-4">
          <!-- SEARCH BAR - Desktop & Tablet -->
          <div class="hidden sm:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64 lg:w-80">
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              class="bg-transparent outline-none px-3 text-sm flex-1 placeholder-gray-400"
            />
          </div>

          <!-- Icons -->
          <RouterLink to="/login" class="p-2 hover:bg-gray-100 rounded-full" title="Masuk">
            <UserIcon class="w-5 h-5" />
          </RouterLink>
          <button class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <HeartIcon class="w-5 h-5 text-gray-700" />
          </button>

          <RouterLink to="/cart" class="p-2 hover:bg-gray-100 rounded-full relative">
            <ShoppingBagIcon class="w-5 h-5" />
            <span
              v-if="cart.totalItems"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
            >
              {{ cart.totalItems }}
            </span>
          </RouterLink>
          <!-- Mobile Menu Button -->
          <button
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Bars3Icon v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <XMarkIcon v-else class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- ==================== MOBILE MENU ==================== -->
    <div v-if="isMobileMenuOpen" class="md:hidden border-t bg-white">
      <nav class="flex flex-col px-6 py-6 gap-y-5 text-base font-medium">
        <a href="#" class="py-2 hover:text-black transition-colors">New & Featured</a>
        <a href="#" class="py-2 hover:text-black transition-colors">Pria</a>
        <a href="#" class="py-2 hover:text-black transition-colors">Wanita</a>
        <a href="#" class="py-2 hover:text-black transition-colors">Anak - Anak</a>
        <a href="#" class="py-2 hover:text-black transition-colors">Promo</a>
        <a href="#" class="py-2 hover:text-black transition-colors">SNKRS</a>

        <!-- Search di Mobile (di bawah menu) -->
        <div class="sm:hidden mt-4 bg-gray-100 rounded-2xl px-4 py-3 flex items-center">
          <MagnifyingGlassIcon class="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk..."
            class="bg-transparent outline-none px-3 flex-1 text-sm"
          />
        </div>

        <!-- Action buttons di mobile -->
        <RouterLink to="/login" class="p-2 hover:bg-gray-100 rounded-full" title="Masuk">
          <UserIcon class="w-5 h-5" />
        </RouterLink>
        <div class="flex gap-4 mt-6 pt-6 border-t">
          <button
            class="flex-1 flex items-center justify-center gap-2 py-3 border rounded-2xl hover:bg-gray-50 transition-colors"
          >
            <HeartIcon class="w-5 h-5" />
            <span class="text-sm">Wishlist</span>
          </button>
          <RouterLink to="/cart" class="p-2 hover:bg-gray-100 rounded-full relative">
            <ShoppingBagIcon class="w-5 h-5" />
            <span
              v-if="cart.totalItems"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
            >
              {{ cart.totalItems }}
            </span>
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

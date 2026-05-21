import { auth } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import CartView from '@/views/CartView.vue'
import CheckoutView from '@/views/CheckoutView.vue'
import LoginView from '@/views/LoginView.vue'

// Definisi Routes: Mapping URL ke Component
const routes = [
  {
    path: '/', // URL: <http://localhost:5173/>
    component: HomeView, // Komponen yang akan ditampilkan
  },
  {
    path: '/product/:id', // URL dinamis, contoh: /product/1
    component: ProductDetailView,
    props: true, // Kirim route params sebagai props
  },
  {
    path: '/about', // Route untuk handling 404
    redirect: '/',
  },
  {
    path: '/cart',
    component: CartView,
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/checkout',
    component: CheckoutView,
    meta: { requiresAuth: true }, // Menandai route ini membutuhkan autentikasi
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !auth.isLoggedIn.value) {
    return '/login' // Redirect ke halaman login jika belum terautentikasi
  }

  if (to.path === '/login' && auth.isLoggedIn.value) {
    return '/' // Redirect ke home jika sudah login
  }
})

export default router

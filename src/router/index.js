import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

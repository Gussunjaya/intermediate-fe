import { createRouter, createWebHistory } from 'vue-router'
import ProductSections from '../components/sections/ProductSections.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ProductSections,
    },
  ],
})

export default router

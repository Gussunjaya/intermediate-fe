<script setup>
import HeroSection from './components/sections/HeroSection.vue'
import MainFooter from './components/layout/MainFooter.vue'
import MainNavbar from './components/layout/MainNavbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <MainNavbar />
  <HeroSection />
  <RouterView />
  <MainFooter />
</template>

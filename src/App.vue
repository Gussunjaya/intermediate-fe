<script setup>
import MainFooter from './components/layout/MainFooter.vue'
import MainNavbar from './components/layout/MainNavbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <MainNavbar />
  <RouterView />
  <MainFooter />
</template>

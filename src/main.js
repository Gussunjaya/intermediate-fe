import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

const app = createApp(App)

app.use(router)

app.mount('#app')

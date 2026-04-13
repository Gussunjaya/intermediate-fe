import { reactive, computed } from 'vue'

// State keranjang
const state = reactive({
  items: [],
})

// Tambah produk ke keranjang
function add(product) {
  const existing = state.items.find((item) => item.id === product.id)

  if (existing) {
    existing.qty++ // Produk sudah ada? Tambah qty saja
  } else {
    state.items.push({ ...product, qty: 1 }) // Belum ada? Push baru
  }
}
function formatPrice(price) {
  return (parseInt(price) * 1000).toLocaleString('id-ID')
}

// formatPrice(129) → "129.000""

// Hapus produk dari keranjang
function remove(id) {
  state.items = state.items.filter((item) => item.id !== id)
}
function increase(id) {
  const item = state.items.find((item) => item.id === id)
  if (item) {
    item.qty++
  }
}
function decrease(id) {
  const item = state.items.find((item) => item.id === id)
  if (item) {
    item.qty--
    if (item.qty <= 0) {
      remove(id)
    }
  }
}

// Hitung total qty semua item
const totalItems = computed(() => state.items.reduce((sum, item) => sum + item.qty, 0))

const totalPrice = computed(() => state.items.reduce((sum, item) => sum + item.price * item.qty, 0))
// Export jadi satu object
export const cart = {
  state,
  add,
  increase,
  decrease,
  remove,
  totalItems,
  totalPrice,
  formatPrice,
}

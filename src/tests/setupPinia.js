import { createPinia, setActivePinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp({})
const pinia = createPinia()
app.use(pinia)
setActivePinia(pinia)
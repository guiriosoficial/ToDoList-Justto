import '@/assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import App from '@/App.vue'
import JusIcon from "@/components/JusIcon.vue"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fas)

createApp(App)
  .use(router)
  .component("JusIcon", JusIcon)
  .mount('#app')

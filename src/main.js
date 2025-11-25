import '@/assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)

library.add(fas)
app.component("FontAwesomeIcon", FontAwesomeIcon)
app.use(router)

app.mount('#app')

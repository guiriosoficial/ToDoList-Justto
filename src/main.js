// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// ===== IMPORTS ===== //
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

import taskList from './components/taskList'
import about from './components/about'
import error404 from './components/error404'
// === END IMPORTS === //

// ====== PATHS ====== //
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/taskList' },
  { path: '/taskList', component: taskList },
  { path: '/about', component: about },
  { path: '*', component: error404 }
]

const router = new VueRouter({
  mode: 'history',
  routes
})
// ===== END PETHS ===== //

// ==== VUE SETTINGS ==== //
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
// == END VUE SETTINGS == //

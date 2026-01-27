const TodoView = () => import('@/views/TodoView.vue')
const AboutView = () => import('@/views/AboutView.vue')

export const routes = [
  {
    path: '/',
    name: 'home',
    component: TodoView,
    meta: {
      headerButtonTitle: 'ABOUT',
      headerButtonLink: 'about'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      headerButtonTitle: 'BACK',
      headerButtonLink: 'home'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

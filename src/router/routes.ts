const TodoView = () => import('@/views/TodoView.vue')
const AboutView = () => import('@/views/AboutView.vue')

export const routes = [
  {
    path: '/',
    component: TodoView,
    meta: {
      headerButtonTitle: 'ABOUT'
    }
  },
  {
    path: '/about',
    component: AboutView,
    meta: {
      headerButtonTitle: 'BACK'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

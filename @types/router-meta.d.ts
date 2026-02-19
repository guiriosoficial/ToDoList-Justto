import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    headerButtonTitle?: string
    headerButtonLink?: string
  }
}
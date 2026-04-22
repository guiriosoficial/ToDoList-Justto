import 'vue-router'
import type { RouteRecordName } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    headerButtonLink?: RouteRecordName
  }
}

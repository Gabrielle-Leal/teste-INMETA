import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { useAuthStore } from '@stores/auth'

// Pages - Lazy loaded
const Home = defineAsyncComponent(() => import('@pages/Home.vue'))
const Login = defineAsyncComponent(() => import('@pages/Login.vue'))
const Register = defineAsyncComponent(() => import('@pages/Register.vue'))
const Dashboard = defineAsyncComponent(() => import('@pages/Dashboard.vue'))
const Marketplace = defineAsyncComponent(() => import('@pages/Marketplace.vue'))
const ExampleValidation = defineAsyncComponent(() => import('@pages/ExampleValidation.vue'))
const NotFound = defineAsyncComponent(() => import('@pages/NotFound.vue'))

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true },
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: Marketplace,
  },
  {
    path: '/example-validation',
    name: 'ExampleValidation',
    component: ExampleValidation,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router

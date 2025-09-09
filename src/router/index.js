import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '@/views/AccessDenied.vue'
import isAuthenticated from '@/authenticate'
import authenticateRole from '@/role'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegister.vue'
import CustomerPage from '@/views/CustomerPage.vue'
import AdminPage from '@/views/AdminPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/Firelogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/customer',
    name: 'CustomerPage',
    component: CustomerPage
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  console.log('isAuthenticated:', isAuthenticated.value)
  if (to.name ==='access-denied') { 
    next()
  }else if (isAuthenticated.value && authenticateRole.value === 'Admin'){
    next({ name: 'AdminPage' })
  } else if (isAuthenticated.value && authenticateRole.value === 'Customer'){
    next({ name: 'CustomerPage' })
  }
  else if (
    to.name ==='Home' &&
    to.name !== 'Login' &&
    to.name !== 'FireLogin' &&
    to.name !== 'FireRegister' &&
    !isAuthenticated.value) next({ name: 'Login' })
  else next()
})

export default router

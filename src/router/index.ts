import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import LoginPage from '@/pages/LoginPage.vue';
import RegisterPage from '@/pages/RegisterPage.vue';
import HomePage from '@/pages/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/chat',  
    name: 'ChatView',
    component: HomePage, 
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const accessToken = localStorage.getItem('accessToken');
  const isAuthPage = to.name === 'Login' || to.name === 'Register';

  if (accessToken && isAuthPage) {
    next({ name: 'Home' });
  } else if (requiresAuth) {
    if (!accessToken) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
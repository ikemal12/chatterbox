import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import UserAuth from '@/components/UserAuth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/chats/:uri?',
      name: 'Chat',
      component: Chat
    },

    {
      path: '/auth',
      name: 'UserAuth',
      component: UserAuth
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (to.path !== '/auth' && !isAuthenticated) {
    next('/auth');
  } else if (to.path === '/auth' && isAuthenticated) {
    // Prevent double redirect
    if (from.path !== '/chats') {
      next('/chats');
    } else {
      next(false); // Cancel navigation
    }
  } else {
    next();
  }
});

export default router
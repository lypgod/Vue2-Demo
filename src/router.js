import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue';
import UserManage from './views/manage/UserManage.vue';
import RoleManage from './views/manage/RoleManage.vue';
import Login from './views/auth/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'user',
          name: 'admin-user',
          component: UserManage
        },
        {
          path: 'role',
          name: 'admin-role',
          component: RoleManage
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/auth/Register.vue')
    }, {
      // not found handler
      path: '*',
      redirect: '/login'
    }
  ]
});

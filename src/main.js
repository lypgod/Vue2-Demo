import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './plugins/axios';
import './plugins/element.js';
import './plugins/vue-filter.js';
import { Message } from 'element-ui';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      Message({
        showClose: true,
        message: '请先登录！',
        type: 'error'
      });
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue';
import Vuex from 'vuex';
import authService from './services/AuthService';
import { Message } from 'element-ui';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    storeCurrentUser (state, userData) {
      state.currentUser = userData;
    },
    clearCurrentUser (state) {
      state.currentUser = null;
    }
  },
  actions: {
    login ({ commit }, userData) {
      authService.login(userData.form.username, userData.form.password)
        .then(function (response) {
          localStorage.setItem('user', response.data.user);
          localStorage.setItem('jwt', response.data.token);
          commit('storeCurrentUser', response.data);
          userData.$router.push(userData.$route.query.redirect ? userData.$route.query.redirect : '/admin/user');
          Message({
            showClose: true,
            message: '登录成功！',
            type: 'success'
          });
        });
    },
    logout ({ commit }, userData) {
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
      commit('clearCurrentUser');
      userData.$router.push('login');
      Message({
        showClose: true,
        message: '已退出登录！',
        type: 'warning'
      });
    }
  },
  getters: {
    user (state) {
      return state.currentUser.user;
    },
    jwt (state) {
      return state.currentUser.token;
    },
    loggedIn (state) {
      return state.currentUser !== null;
    }
  }
});

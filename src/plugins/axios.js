'use strict';

import Vue from 'vue';
import axios from 'axios';
import store from '../store';
import { Message } from 'element-ui';

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = process.env.VUE_APP_SERVER_HOST;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

axios.interceptors.request.use(
  function (config) {
    if (store.getters.loggedIn) {
      config.headers.Authorization = 'Bearer ' + store.getters.jwt;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // console.log(response);
    return response;
  },
  function (error) {
    let errorMessage = '';
    if (error.response.data.messages) {
      error.response.data.messages.forEach(msg => {
        errorMessage += '<p>' + msg + '</p>';
      });
    } else {
      switch (error.response.status) {
        case 400:
          errorMessage = '请求错误';
          break;

        case 401:
          errorMessage = '未授权，请登录';
          break;

        case 403:
          errorMessage = '拒绝访问';
          break;

        case 404:
          errorMessage = `请求地址出错: ${error.response.config.url}`;
          break;

        case 408:
          errorMessage = '请求超时';
          break;

        case 500:
          errorMessage = '服务器内部错误';
          break;

        case 501:
          errorMessage = '服务未实现';
          break;

        case 502:
          errorMessage = '网关错误';
          break;

        case 503:
          errorMessage = '服务不可用';
          break;

        case 504:
          errorMessage = '网关超时';
          break;

        case 505:
          errorMessage = 'HTTP版本不受支持';
          break;

        default:
      }
    }

    Message({
      showClose: true,
      dangerouslyUseHTMLString: true,
      message: errorMessage,
      type: 'error'
    });
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios;
      }
    },
    $axios: {
      get () {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;

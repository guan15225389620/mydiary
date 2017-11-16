// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import AlloyFinger from 'alloyfinger/alloy_finger.js'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue.js'
Vue.use(AlloyFingerVue, {
  AlloyFinger
})
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use(res => {
  if (res.data && res.data.code === 11) {
    alert('登录失效')
    router.push('/login')
    return
  }
  return res
}, function (error) {
  return Promise.reject(error)
})
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

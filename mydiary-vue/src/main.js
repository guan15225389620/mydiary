// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000';
axios.interceptors.response.use(res => {
  console.log(res.data)
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

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Setting from '@/views/Setting'
Vue.use(Router)



const router = new Router({
  routes :[
    {
      path: '/',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },{
      path: '/home',
      component:Home
    },{
      path:'/setting',
      component: Setting
    }

]
//定义路由
})
// 创建路由实例

export default  router

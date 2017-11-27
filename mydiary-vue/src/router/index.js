import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Setting from '@/views/Setting'
import Diary from '@/views/Diary/Index.vue'
import Entries from '../views/Diary/Entries.vue'
import Calendar from '../views/Diary/Calendar.vue'
import Write from '../views/Diary/Write.vue'
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
    }, {
      path: '/diary',
      component: Diary,
      children: [
        {
          path: 'entries',
          component: Entries
        },
        {
          path: 'calendar',
          component: Calendar
        },
        {
          path: 'write',
          component: Write
        }
      ]
    },

]
//定义路由
})
// 创建路由实例

export default  router

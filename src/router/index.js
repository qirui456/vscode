import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import  Layout from '@/views/Layout/IndexView.vue'
import Home from '@/views/Home/IndexView.vue'
import User from '@/views/User/IndexView.vue'
import Search from '@/views/Search/IndexView.vue'
import SearchResult from '@/views/Search/SearchResult.vue'
// import Layout from '@/views/Layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path:'/layout',
    component: Layout,
    children:[
      {
        path:'home',
        component:Home
      },
      {
        path:'user',
        component:User
      }
    ]
  },
  {
    path:'/search',
    component:Search
  },
  {
    path:'/search_result/:kw',
    component:SearchResult
  }

]

const router = new VueRouter({
  routes
})

export default router

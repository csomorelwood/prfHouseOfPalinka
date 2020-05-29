import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Users from '@/components/Users'
import Tips from '@/components/Tips'
import Palinkafozes from '@/components/Palinkafozes'
import Listpalinka from '@/components/Listpalinka'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/listusers',
      name: 'Users',
      component: Users
    },
    {
      path: '/tips',
      name: 'Tips',
      component: Tips
    },
    {
      path: '/listpalinka',
      name: 'Listpalinka',
      component: Listpalinka
    },
    {
      path: '/palinkafozes',
      name: 'Palinkafozes',
      component: Palinkafozes
    }
  ]
})

<template>
  <nav>
    <div class="navbar">
      <ul>
        <li>
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li v-if="auth==''">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li v-if="auth==''">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li v-if="auth=='loggedin'">
          <a class="nav-link" href="" v-on:click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import EventBus from './EventBus'

EventBus.$on('logged-in', test => {
  console.log(test)
})
export default {
  data () {
    return {
      auth: '',
      user: ''
    }
  },

  methods: {
    logout () {
      localStorage.removeItem('usertoken')
    }
  },

  mounted () {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  }
}
</script>

<template>
  <nav>
    <div class="navbar">
      <ul>
        <li>
          <router-link class="nav-link" to="/">Pálinka háza</router-link>
        </li>
        <li v-if="auth==''">
          <router-link class="nav-link" to="/login">Bejelentkezés</router-link>
        </li>
        <li v-if="auth==''">
          <router-link class="nav-link" to="/register">Regisztráció</router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/tips">Tippek a főzéshez</router-link>
        </li>
        <li v-if="auth=='loggedin'">
          <router-link class="nav-link" to="/listusers">Felhasználóink</router-link>
        </li>
        <li v-if="auth=='loggedin'">
          <router-link class="nav-link" to="/listpalinka">Pálinkáink</router-link>
        </li>
        <li v-if="auth=='loggedin'">
          <router-link class="nav-link" to="/palinkafozes">Pálinka főzés</router-link>
        </li>
        <li v-if="auth=='loggedin'">
          <a class="nav-link" href="" v-on:click="logout">Kijelentkezés</a>
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
      localStorage.removeItem('userid')
    }
  },

  mounted () {
    EventBus.$on('logged-in', status => {
      this.auth = status
    })
  }
}
</script>

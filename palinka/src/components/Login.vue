<template>
  <section>
    <div class="container">
      <form v-on:submit.prevent="login">
        <h1 class="title">Jelentkezz be</h1>
        <div class="form-group">
          <label for="username">Felhasználónév</label>
          <input type="text" v-model="username" name="username" placeholder="Östván atya">
        </div>
        <div class="form-group">
          <label for="password">Jelszó</label>
          <input type="password" v-model="password" name="password" placeholder="******">
        </div>
        <button class="submit-btn">Bejelentkezés</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post('/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.status === 200) {
          localStorage.setItem('usertoken', res.data.token)
          localStorage.setItem('userid', res.data.id)
          router.push('/')
          this.emitMethod()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>

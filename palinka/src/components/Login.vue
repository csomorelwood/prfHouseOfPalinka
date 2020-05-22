<template>
  <section>
    <div class="container">
      <form v-on:submit.prevent="login">
        <h1>Jelentkezz be</h1>
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
      usernae: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post('login', {
        email: this.email,
        password: this.password
      }).then(res => {
        localStorage.setItem('usertoken', res.data)
        this.email = ''
        this.password = ''
        router.push({name: 'Profile'})
      }).catch(err => {
        console.log(err)
      })
      this.emitMethod()
    },
    emitMethod () {
      EventBus.$emit('logged-in', 'loggedin')
    }
  }
}
</script>

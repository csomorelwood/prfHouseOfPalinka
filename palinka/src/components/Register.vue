<template>
  <section>
    <div class="container">
      <form v-on:submit.prevent="register">
        <h1>Regisztrálj most</h1>
        <div class="form-group">
          <label for="username">Felhasználónév</label>
          <input type="text" v-model="username" name="username" placeholder="Östván atya">
        </div>
        <div class="form-group">
          <label for="password">Jelszó</label>
          <input type="password" v-model="password" name="password" placeholder="******">
        </div>
        <button class="submit-btn">Regisztrálás</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data () {
    return {
      usernae: '',
      password: ''
    }
  },
  methods: {
    register () {
      axios.post('register', {
        email: this.email,
        password: this.password
      }).then(res => {
        router.push({name: 'Login'})
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

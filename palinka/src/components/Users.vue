<template>
  <section>
    <div class="container">
      <h1 class="title">Regisztrált felhasználóink</h1>
      <div class="row">
        <div class="col" v-for="user in users" :key="user._id">
          <p>Felhasználónév: {{user.username}}</p>
          <p>Szerepkör: {{user.role}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: 'asd'
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      axios.get('/listusers', {
        headers: {
          'Authorization': localStorage.getItem('usertoken')
        }
      }).then(res => {
        this.users = res.data.users
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

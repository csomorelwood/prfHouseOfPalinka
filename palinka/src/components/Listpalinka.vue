<template>
  <section>
    <div class="container">
      <h1>Felhasználóink pálinkái</h1>
      <div class="row" v-for="palinka in palinkak" :key="palinka._id">
        <div class="col">
          <p>Elnevezés: {{palinka.name}}</p>
          <p>Típus: {{palinka.type}}</p>
          <p>Tulajdonos: {{palinka.owner}}</p>
          <p>Főzés kezdete: {{palinka.startBrew}}</p>
          <p>Főzés vége: {{palinka.endBrew}}</p>
          <p>Mennyiség: {{palinka.quantity}} liter</p>
          <p><strong>Hozzávalók:</strong></p>
          <div class="ingredients" v-for="ing in palinka.ingredients" :key="ing">
            <p>{{ing}}</p>
          </div>
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
      palinkak: 'asd'
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      axios.get('/listpalinka', {
        headers: {
          'Authorization': localStorage.getItem('usertoken')
        }
      }).then(res => {
        this.palinkak = res.data.palinkak
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

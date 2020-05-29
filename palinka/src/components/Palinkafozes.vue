<template>
  <section>
    <div class="container">
        <h1 class="title">Saját pálinka készítése</h1>
        <div class="form-group">
          <label for="startBrew">Főzés kezdete</label>
          <input type="text" v-model="startBrew" name="startBrew" placeholder="2020-01-01:19:05">
        </div>
        <div class="form-group">
          <label for="endBrew">Főzés vége</label>
          <input type="text" v-model="endBrew" name="endBrew" placeholder="2020-01-01:21:00">
        </div>
        <div class="form-group">
          <label for="name">Pálinka neve</label>
          <input type="text" v-model="name" name="name" placeholder="Vegyes kerítésszaggató">
        </div>
        <div class="form-group">
          <label for="type">Típus</label>
          <select v-model="type">
            <option
              v-for="option in types"
              :key="option._id"
              :value="option._id"
            >{{ option.tipus }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="ingredients">Összetevők</label>
          <div v-for="(ingredient, index) in ingredients" :key="index">
            <p>{{ingredient}}</p>
          </div>
          <input type="text" v-model="csoki">
          <span @click="addmoreingredient">Új összetevő hozzáadása</span>
        </div>
        <div class="form-group">
          <label for="quantity">Mennyiség (liter)</label>
          <input type="text" v-model="quantity" name="quantity" placeholder="200">
        </div>
        <button @click="addpalinka">Hozzáad</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  data () {
    return {
      name: '',
      startBrew: '',
      endBrew: '',
      type: '',
      quantity: '',
      ingredients: [],
      types: [],
      csoki: ''
    }
  },
  mounted () {
    axios.get('/listpalinkatipus', {
      headers: {
        'Authorization': localStorage.getItem('usertoken')
      }
    }).then(res => {
      console.log(res.data.palinkatipusok)
      this.types = res.data.palinkatipusok
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    addpalinka () {
      console.log(this.ingredients, this.type)
      axios.post('/addpalinka', {
        owner: localStorage.getItem('userid'),
        name: this.name,
        startBrew: this.startBrew,
        endBrew: this.endBrew,
        type: this.type,
        quantity: this.quantity,
        ingredients: this.ingredients
      }).then(res => {
        if (res.status === 200) {
          router.push('/')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    addmoreingredient () {
      console.log(this.csoki)
      this.ingredients.push(this.csoki)
    }
  }
}
</script>

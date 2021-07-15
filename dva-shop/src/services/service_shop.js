import axios from 'axios'

export default {
  getProducts: () => axios.get('./data/products.json'),
  buyProducts: (payload) => new Promise((resolve) => { setTimeout(() => resolve(payload), 2000) } )
}
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import PokemonList from '../views/PokedexList.vue'
import PokemonEntry from '../views/PokedexEntry.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/list',
      name: 'list',
      component: PokemonList
    },
    {
      path: '/list/:id',
      name: 'pokemonid',
      component: PokemonEntry
    }
  ]
})

export default router

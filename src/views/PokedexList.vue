<script setup>
  import { ref, computed } from 'vue'
  import PokemonSprite from '../components/ListSprite.vue'

  const data = ref(null);
  const error = ref(null);
  let filterInput = ref(null);

  const computedFilter = computed(() => {
    let num = Number(filterInput.value);
    if(filterInput.value){
      let filter = data.value.results.map((pokemon) => {
        let url = pokemon.url.split("/");
        if(num && String(url[6]).includes(String(num))) return url[6]; 
        else if(pokemon.name.includes(filterInput.value)) {
          return pokemon.name;
        }
      })
      filter = filter.filter((pokemon) => pokemon !== undefined)
      if(!filter) filter = []
      return filter;
    } else {
      return data.value.results.map((pokemon) => pokemon.name);
    }

    
  })

  fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then((res) => res.json())
  .then((json) => {data.value = json})
  .catch((err) => (error.value = err))

  function filterIDHelper(arr, url) {
    let id = url.split("/");
    return arr.includes(id[6])
  }

</script>

<template>
  <main class="Main_div">
    <input class="filterInput" v-model="filterInput" type="text" />
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div id="pokedex" class="pokedex_wrapper" v-else-if="data">
      <div v-for="pokemon in data.results">
        <div class="pokemon_block" v-if="computedFilter.includes(pokemon.name) || filterIDHelper(computedFilter, pokemon.url)">
          <PokemonSprite :url="pokemon.url"></PokemonSprite>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </main>
</template>

<style>
  @media (min-width: 400px) {
    .Main_div {
      display: flex;
      justify-content: center;
    }
  }

  @media (min-width: 720px) {
    .Main_div {
      justify-content: flex-start;
    }
    .filterInput {
      left: 30px ;
    }
  }

  .filterInput {
    position: absolute;
    top: 30px;
  }

  .Main_div {
    background-color: antiquewhite;
  }

  .pokedex_wrapper {
    margin: 0px 16.7rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: antiquewhite;
  }

  .pokemon_block {
    height: 15rem;
    width: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    border: 1px solid gray;
    background-color: white;
  }

  
</style>
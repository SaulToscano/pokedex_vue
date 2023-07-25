<script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import pokemonTypes from '../utils/types';

  import StatBar from '../components/PokemonStatBar.vue'
  
  const route = useRoute()
  const id = route.params.id

  const urlData = "https://pokeapi.co/api/v2/pokemon/" + id;

  const data = ref(null);
  const error = ref(null);
  let urlSprite = ref(null);

  fetch(urlData)
  .then((res) => res.json())
  .then((json) => {data.value = json; urlSprite = json.sprites.other["official-artwork"].front_default})
  .catch((err) => (error.value = err))

</script>

<template>
  <main>
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
    <div class="pokemon_data_container" v-else-if="data">
      
      <div class="pokemon_container">
        <div class="Photo">
          <h3 class="pokemon_card_id">#{{data.id}}</h3>
          <img class="Image" :src="urlSprite" alt="pokemon artwork"/>
          <div class="pokemon_name">
            <h3 class="pokemon_photo_name">{{data.name}}</h3>
          </div>
        </div>

        <div class="stat_bars">
          <div class="types_wrapper">
            <div >
              <img v-for="types in data.types" class="type_img" :src="pokemonTypes[types.type.name]" alt="pokemon type" />
            </div>
            <img src="../assets/backgrounds/pokeball.gif" alt="pokeball gif" />
          </div>
          <div class="bar_wrapper" v-for="bar in data.stats">
            <StatBar :stat="bar"></StatBar>
          </div>
        </div>
      </div>

    </div>
    <div v-else>Loading...</div>
  </main>
</template>

<style>
  @media (min-width: 400px) {
    .pokemon_container {
      flex-direction: column;
      align-items: center;
    }

    .pokemon_data_container {
      margin-top: 1rem;
    }
  }

  @media (min-width: 720px) {
    .pokemon_data_container {
      margin-top: 5rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .pokemon_container {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  body {
    background-image: url('../assets/backgrounds/pokedex_wallpaper2.webp');
  }

  .pokemon_photo_name {
    font-family: Lucida Handwriting;
    color: gray;
  }

  .pokemon_card_id {
    margin: 0;
    text-align: start;
    width: 100%;
    margin-left: 5px;
  }

  .pokemon_container {
    display: flex;
  }

  .types_wrapper {
    display: flex;
    justify-content: space-between;
  }

  .type_img {
    width: 3rem;
    margin: 0.5rem;
  }

  .Photo {
    width: 24rem;
    height: 27rem;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: antiquewhite;
  }
  .Image {
    border: 1px solid black;
    margin-top: 1rem;
    width: 20rem;
    background-image: url('../assets/backgrounds/pokemon_wallpaper3.jpg');
    background-size: cover;
    background-position-y: center;
  }
  .pokemon_name {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pokemon_name h3 {
    margin: 0;
  }

  .stat_bars {
    padding: 1rem;
    width: 15rem;
    background: antiquewhite;
    height: 50%;
    border-radius: 29px 5px;
  }
</style>
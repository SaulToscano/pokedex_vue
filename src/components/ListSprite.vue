<script setup>
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router'

  const props = defineProps({
    url: {
      type: String,
      required: true
    }
  })

  const data = ref(null);
  const error = ref(null);
  let urlSprite = ref(null);

  fetch(props.url)
  .then((res) => res.json())
  .then((json) => {data.value = json; urlSprite = json.sprites.versions["generation-viii"].icons.front_default})
  .catch((err) => (error.value = err))

</script>

<template>
  <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
  <div class="pokemon_data_wrapper" v-else-if="data">
    <RouterLink :to="{ path: '/list/' +  data.id}">
      <div class="pokemon_data">
        <p class="pokemon_id">{{data.id}}</p>
        <img class="pokemonSprite" :src="urlSprite"/>
      </div>
    </RouterLink>
  </div>
  <div v-else>Loading...</div>
</template>

<style>
a {
  text-decoration: none;
}

.pokemon_id {
  font-size: 24px;
  color: grey;
}

.pokemon_data_wrapper {
  width: 100%;
  height: 100%;
}

.pokemon_data {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pokemon_data p{
  margin: 0;
}

.pokemonSprite {
  width: 15rem;
}

.pokemonSprite:hover {
  animation-duration: 0.4s;
  animation-iteration-count: infinite;
  animation-name: bounce-2;
  animation-timing-function: ease;
}

.bounce-2 {
  animation-name: bounce-2;
  animation-timing-function: ease;
}


@keyframes bounce-2 {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}
</style>
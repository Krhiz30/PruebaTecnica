<template>
  <Loading v-if="isLoading" />
  <div v-else class="container" v-if="!active">
    <div class="row justify-content-center align-items-center mt-5">
      <div class="col-md-7">
        <div class="search-input-container">
          <input
            v-model="text"
            type="text"
            class="form-control search-input"
            placeholder="Search"
          />
          <i class="fas fa-search search-icon"></i>
        </div>
        <div
          class="col-12 row align-items-center mt-2"
          v-if="listPokemon.length > 0"
        >
          <ol class="list-group list-group-flush">
            <li
              class="list-group-item d-flex justify-content-between align-items-center cursor-pointer"
              v-for="(item, index) in listPokemon"
              :key="index"
            >
              <div class="ms-2 me-auto">
                <div class="fw-bold">{{ item.name }}</div>
              </div>
              <img
                :src="iconDisabled"
                class="icon-disabled"
                v-if="!pokemonStore.isSelected(item)"
                @click="selectPokemonItem(item)"
              />
              <img
                :src="iconActive"
                class="icon-active"
                v-else
                @click="removePokemonItem(item)"
              />
            </li>
          </ol>
        </div>
        <div
          class="row justify-content-center mb-5"
          v-if="listPokemon.length > 0"
        >
          <div class="col-6">
            <button
              class="btn-base mt-4"
              :class="activeButton ? 'btn-active' : 'btn-disabled'"
            >
              <img :src="iconAll" />
            </button>
          </div>
          <div class="col-6">
            <button
              class="btn-base mt-4"
              :class="!disabledButton ? 'btn-disabled' : 'btn-active'"
              @click="goFavorites()"
            >
              <img :src="iconFavorites" />
            </button>
          </div>
        </div>
        <div
          class="row justify-content-center align-items-center text-center mt-4"
          v-if="listPokemon.length == 0 && searchNoResults"
        >
          <h1>Uh-oh !</h1>
          <p>You look lost on your journey!</p>
        </div>
        <div
          class="row text-center"
          v-if="listPokemon.length == 0 && searchNoResults"
        >
          <div class="">
            <button
              class="btn-go-home mt-4"
              @click="router.push({ name: 'Home' })"
            >
              Get back home
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FavoritesPokemon v-if="active" @all-list="changeShow" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { getListPokemon } from "../assets/services/axios";
import { usePokemonStore } from "../store/pokemonStore";
import FavoritesPokemon from "../components/FavoritesPokemon.vue";
import Loading from "../components/Loading.vue";
import iconActive from "../assets/images/active.png";
import iconDisabled from "../assets/images/disabled.png";
import iconFavorites from "../assets/images/favorites.png";
import iconAll from "../assets/images/all.png";
import Swal from "sweetalert2";

interface dataPokemon {
  name: string;
  url: string;
}
const pokemonStore = usePokemonStore();
const router = useRouter();
const text = ref<any>("");
const activeButton = ref(false);
const disabledButton = ref(false);
const active = ref(false);
const isLoading = ref(true);
const dataPokemonList = ref<dataPokemon[]>([]);
const listPokemon = ref<any[]>([]);
const searchNoResults = ref(false);

const MIN_LOADING_TIME = 1500;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const capitalizeFirstLetter = (text: string): string => {
  if (text.length > 0) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return text;
};

watch(text, (newValue) => {
  if (newValue) {
    const filteredList = dataPokemonList.value.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(newValue.toLowerCase())
    );
    listPokemon.value = filteredList;
    searchNoResults.value = filteredList.length === 0;
  } else {
    listPokemon.value = [];
  }
});

onMounted(async () => {
  isLoading.value = true;

  try {
    const [data] = await Promise.all([
      getListPokemon(),
      delay(MIN_LOADING_TIME),
    ]);
    const responseData = data.results.map((pokemon: any) => ({
      ...pokemon,
      name: capitalizeFirstLetter(pokemon.name),
    }));
    listPokemon.value = responseData;
    dataPokemonList.value = [...responseData];
    activeButton.value = true;
  } catch (e: any) {
    Swal.fire({
        title: 'Pokédex',
        text: 'Ha ocurrido un problema, inténtelo más tarde.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
  } finally {
    isLoading.value = false;
  }
});

const selectPokemonItem = (pokemon: any) => {
  pokemonStore.addSelectedPokemon(pokemon);
};

const removePokemonItem = (pokemon: any) => {
  pokemonStore.removeSelectedPokemon(pokemon);
};

const goFavorites = () => {
  active.value = true;
};

const changeShow = (val: any) => {
  if (val) {
    active.value = false;
  }
};
</script>

<style scoped>
.search-input-container {
  position: relative;
}

.search-input {
  padding-left: 2.5rem;
}

.search-input::placeholder {
  color: var(--disabled-color);
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--disabled-color);
}

.icon-disabled {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.icon-active {
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.btn-base {
  width: 100%;
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 25px;
  display: block;
}

.btn-active {
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  color: var(--white-color);
}

.btn-disabled {
  border: 1px solid var(--disabled-color);
  background-color: var(--disabled-color);
  color: var(--white-color);
}

.btn-go-home {
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 25px;
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  color: var(--white-color);
}
</style>

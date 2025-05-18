<template>
  <div class="container">
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
              class="list-group-item d-flex justify-content-between align-items-center selected-pokemon"
              v-for="(item, index) in listPokemon"
              :key="index"
              @click="showDataPokemon(item)"
            >
              <div class="ms-2 me-auto">
                <div class="fw-bold">{{ item.name }}</div>
              </div>

              <img :src="iconActive" class="icon-active" />
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
              @click="goAllPokemon()"
            >
              <img :src="iconAll" />
            </button>
          </div>
          <div class="col-6">
            <button
              class="btn-base mt-4"
              :class="!disabledButton ? 'btn-disabled' : 'btn-active'"
            >
              <img :src="iconFavorites" />
            </button>
          </div>
        </div>
        <div
          class="row justify-content-center align-items-center text-center mt-4"
          v-if="listPokemon.length == 0"
        >
          <h1>Uh-oh !</h1>
          <p>You look lost on your journey!</p>
        </div>
        <div class="row text-center" v-if="listPokemon.length == 0">
          <div class="">
            <button
              class="btn-go-home mt-4"
              @click="goHome"
            >
              Get back home
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="myModal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body padding-none">
            <ModalPokemonData
              v-if="show"
              :data="pokemonSelected"
              @close="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { usePokemonStore } from "../store/pokemonStore";
import { useRouter } from "vue-router";
import iconActive from "../assets/images/active.png";
import iconAll from "../assets/images/all.png";
import iconFavorites from "../assets/images/favorites.png";
import ModalPokemonData from "./ModalPokemonData.vue";
import { Modal } from "bootstrap";
const pokemonStore = usePokemonStore();
const router = useRouter();
const emits = defineEmits(["allList"]);

const listPokemon = ref<any[]>([]);
const allSelectedPokemons = ref<any[]>([]);
const text = ref("");
const activeButton = ref(false);
const disabledButton = ref(true);
// Importa la clase Modal de Bootstrap

const myModal = ref<HTMLElement | null>(null);
const modalInstance = ref<Modal | null>(null);
const show = ref(false);
const pokemonSelected = ref<any>(null);

const filteredPokemon = computed(() => {
  if (!text.value) {
    return allSelectedPokemons.value;
  }
  const searchTerm = text.value.toLowerCase();
  return allSelectedPokemons.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );
});

watch(filteredPokemon, (newFilteredList) => {
  listPokemon.value = newFilteredList;
});

onMounted(() => {
  allSelectedPokemons.value = pokemonStore.getSelectedPokemons;
  listPokemon.value = [...allSelectedPokemons.value];
});

const goAllPokemon = () => {
  emits("allList", true);
};

const showDataPokemon = (pokemon: any) => {
  pokemonSelected.value = pokemon;
  show.value = true;

  nextTick(() => {
    if (myModal.value) {
      modalInstance.value = new Modal(myModal.value);
      modalInstance.value.show();
    }
  });
};

const closeModal = () => {
  if (modalInstance.value) {
    modalInstance.value.hide();
  }
  show.value = false; 
  pokemonSelected.value = null; 
};

const goHome = () => {
    router.push({name:'Home'});
}
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

.icon-active {
  width: 50px;
  height: 50px;
}

.btn-go-home {
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 25px;
  border: 1px solid var(--primary-color);
  background-color: var(--primary-color);
  color: var(--white-color);
}

.padding-none {
  padding: 0px !important;
}
.selected-pokemon {
  cursor: pointer;
}
</style>

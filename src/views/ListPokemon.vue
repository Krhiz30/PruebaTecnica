<template>
  <Loading v-if="isLoading" />
  <div v-else class="container">
    <h1>buscador</h1>
    {{ listPokemon }}
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Loading from "../components/Loading.vue";
import { getListPokemon } from "../assets/services/axios";

const isLoading = ref(true);
const listPokemon = ref([]);

const MIN_LOADING_TIME = 1500;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

onMounted(async () => {
  isLoading.value = true;

  try {
    const [data] = await Promise.all([
      getListPokemon(),
      delay(MIN_LOADING_TIME),
    ]);
    listPokemon.value = data.results;
    console.log(listPokemon)
  } catch (e: any) {
    console.log(e);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped></style>

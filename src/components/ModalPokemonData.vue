<template>
  <div class="modal-container">
    <div class="modal-header">
      <div class="image-container" v-if="imageUrl">
        <img :src="imageUrl" class="pokemon-image" alt="Imagen del Pokémon" />
      </div>
      
      <img :src="iconClose" class="close-button" @click="emitClose" />
    </div>
    <div class="modal-body">
      <div class="info-row">
        <span class="info-label">Name:</span>
        <span class="info-value">{{ pokemonName }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Weight:</span>
        <span class="info-value">{{ pokemonWeight }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Height:</span>
        <span class="info-value">{{ pokemonHeight }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Types:</span>
        <span class="info-value">{{ pokemonTypes.join(", ") }}</span>
      </div>
    </div>
    <div class="modal-footer">
      <button class="share-button" @click="sharePokemon">Share to my friends</button>
      
      <img :src="iconActive" class="favorite-button" />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { getDataPokemon } from "../assets/services/axios";
import iconClose from '../assets/images/close.png'
import iconActive from '../assets/images/active.png'
import Swal from "sweetalert2";

const props = defineProps(["data"]);
const emit = defineEmits(['close']);

const pokemonName = ref<string | null>(null);
const pokemonWeight = ref<number | null>(null);
const pokemonHeight = ref<number | null>(null);
const pokemonTypes = ref<string[]>([]);
const imageUrl = ref<string | null>(null);

watch(
  () => props.data,
  async (newData) => {
    if (newData && newData.name) {
      const response = await getDataPokemon(newData.name);
      pokemonName.value = response.name;
      pokemonWeight.value = response.weight;
      pokemonHeight.value = response.height;
      pokemonTypes.value = response.types.map(
        (typeInfo: any) => typeInfo.type.name
      );
      imageUrl.value = response.sprites.other["official-artwork"].front_default;
    }
  },
  { immediate: true }
);
const emitClose = () => {
  emit('close'); 
}

const sharePokemon = async () => {
  const textToCopy = `Name: ${pokemonName.value}, Weight: ${pokemonWeight.value}, Height: ${pokemonHeight.value}, Types: ${pokemonTypes.value.join(", ")}`;
  
  try {
    await navigator.clipboard.writeText(textToCopy);
    
    Swal.fire({
    title: 'Pokédex',
    text: 'Pokémon info copied to clipboard!.',
    icon: 'success',
    confirmButtonText: 'Accept'
  });
  } catch (err) {
    Swal.fire({
    title: 'Pokédex',
    text: 'Failed to copy to clipboard.',
    icon: 'error',
    confirmButtonText: 'Accept'
  });
    
  }
};
</script>

<style scoped>
.modal-container {
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
}

.modal-header {
  background-image: url("../assets/images/bg-modal.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  height: 180px;
}

.image-container {
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-image {
  display: block;
  width: auto;
  height: auto;
  width: 30%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.close-button:hover {
  opacity: 1;
}

.modal-body {
  padding: 15px;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.info-label {
  font-weight: bold;
  width: 60px;
  margin-right: 10px;
}

.info-value {
  flex-grow: 1;
}

.modal-footer {
  display: flex;
  padding: 15px;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.share-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
}



.favorite-button {
  width: 60px;
  height: 60px;
}


</style>

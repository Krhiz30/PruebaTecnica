<template>
  <div
    class="container loader-container d-flex justify-content-center align-items-center"
  >
    <div class="row justify-content-center align-items-center">
      <div class="col-6 col-sm-6 col-md-5 text-center">
        <img
          :src="Loader"
          alt="Pokebola"
          class="img-fluid rounded-circle img-loader"
          :class="{ rotating: isLoading }"
        />
        <p class="mt-3 text-loading">Loading</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import Loader from "../assets/images/Loader.png";

const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<style scoped>
.loader-container {
  min-height: 100vh;
  padding: 20px;
}
.img-loader {
  height: auto;
}

.text-loading {
  color: var(--secondary-color);
  font-family: "Lato Bold";
  font-size: 20px;
}

.rotating {
  animation: spin 2s linear infinite; /* Define la animación */
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

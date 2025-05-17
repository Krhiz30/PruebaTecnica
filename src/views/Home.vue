<template>
  <div class="container welcome-container">
    <div class="row justify-content-center align-items-center">
      <div class="col-12 col-md-8 text-center">
        <div class="circle-content">
          <div class="circle">
            <img :src="imageHome" alt="Pikachu" class="circle-img" />
          </div>
        </div>
        <h1 class="mt-4">Welcome to Pokédex</h1>
        <p class="mt-3">
          The digital encyclopedia created by Professor Oak is an invaluable
          tool to Trainers in the Pokémon world.
        </p>
        <button class="btn btn-get-started mt-4">Get started</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import imageHome from "../assets/images/img-home.png"; // Asegúrate de que la ruta sea correcta
</script>

<style scoped>
.welcome-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.circle-content {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto;
}

.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--primary-color);
  border: 2px solid var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.circle-img {
  position: absolute;
  top: 41%;
  left: 54%;
  transform: translate(-50%, -50%);
  width: 145%;
  height: auto;
  object-fit: contain;
}

h1 {
  color: var(--secondary-color);
  font-size: 26px;
}

p {
  color: var(--dark-gray);
  font-size: 18px;
  line-height: 1.6;
}

.btn-get-started {
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 25px;
  background-color: var(--primary-color);
  color: var(--white-color);
}
</style>

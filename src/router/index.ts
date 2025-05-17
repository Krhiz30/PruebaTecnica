import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import ListPokemon from '../views/ListPokemon.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/search',
    name: 'ListPokemon',
    component: ListPokemon,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
import { defineStore } from 'pinia';

interface State {
  selectedPokemons: any[]; // Array para almacenar los Pokémon seleccionados
}

export const usePokemonStore = defineStore('pokemon', {
  state: (): State => ({
    selectedPokemons: [],
  }),
  actions: {
    addSelectedPokemon(pokemon: any) {
      this.selectedPokemons.push(pokemon);
    },
    removeSelectedPokemon(pokemonToRemove: any) {
      this.selectedPokemons = this.selectedPokemons.filter(
        (pokemon) => pokemon.url !== pokemonToRemove.url // Usamos un identificador único como la URL
      );
    },
    clearSelectedPokemons() {
      this.selectedPokemons = [];
    },
  },
  getters: {
    getSelectedPokemons: (state) => state.selectedPokemons,
    isSelected: (state) => (pokemon: any) =>
      state.selectedPokemons.some((selected) => selected.url === pokemon.url),
  },
});
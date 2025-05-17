import axios from 'axios';

export async function getListPokemon() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener datos:', error);
    throw new Error(`Error al obtener datos: ${error.message}`);
  }
}

export async function getDataPokemon(name:any) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener datos:', error);
    throw new Error(`Error al obtener datos: ${error.message}`);
  }
}


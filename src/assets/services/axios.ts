import axios from 'axios';
import Swal from 'sweetalert2';

export async function getListPokemon() {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    return response.data;
  } catch (error: any) {
    Swal.fire({
      title: 'Pokédex',
      text: 'Ha ocurrido un problema, inténtelo más tarde.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}

export async function getDataPokemon(name:any) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
  } catch (error: any) {
    Swal.fire({
      title: 'Pokédex',
      text: 'Ha ocurrido un problema, inténtelo más tarde.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }
}


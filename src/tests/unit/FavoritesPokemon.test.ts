import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { createApp } from 'vue';


const mockPush = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));


describe('FavoritesPokemon.vue', () => {
  let pinia: any;
  let app: any;

  beforeEach(() => {
    app = createApp({});
    pinia = createPinia();
    app.use(pinia);
    setActivePinia(pinia);
    mockPush.mockClear();
  });

  afterEach(() => {
    vi.resetModules(); 
  });

  it('navega a la página de inicio cuando se hace clic en "Get back home"', async () => {

    vi.doMock('../../store/pokemonStore', () => ({
      usePokemonStore: () => ({
        getSelectedPokemons: [],
      }),
    }));

    const { default: FavoritesPokemon } = await import('../../components/FavoritesPokemon.vue');

    const wrapper = mount(FavoritesPokemon, {
      global: {
        plugins: [pinia],
      },
    });

    const goHomeButton = wrapper.find('.btn-go-home');
    expect(goHomeButton.exists()).toBe(true);

    await goHomeButton.trigger('click');

    expect(mockPush).toHaveBeenCalledWith({ name: 'Home' });
  });

  it('muestra los pokémon favoritos correctamente', async () => {
    const mockFavorites = [
      { id: 1, name: 'bulbasaur' },
      { id: 4, name: 'charmander' },
    ];

    vi.doMock('../../store/pokemonStore', () => ({
      usePokemonStore: () => ({
        getSelectedPokemons: mockFavorites,
      }),
    }));

    const { default: FavoritesPokemon } = await import('../../components/FavoritesPokemon.vue');

    const wrapper = mount(FavoritesPokemon, {
      global: {
        plugins: [createPinia()],
      },
    });

    await wrapper.vm.$nextTick();

    const listItems = wrapper.findAll('.selected-pokemon');
    expect(listItems.length).toBe(2);
    expect(wrapper.text()).toContain('bulbasaur');
    expect(wrapper.text()).toContain('charmander');
  });
});

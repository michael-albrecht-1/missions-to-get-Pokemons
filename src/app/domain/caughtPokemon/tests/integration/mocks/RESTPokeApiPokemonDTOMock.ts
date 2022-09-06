import { PokemonDTO } from '../../../adapters/secondaries/real/REST-poke-api/PokemonDTO';

export const pokeApiPokemonDTOMock: PokemonDTO = {
  id: 1,
  name: 'pokemonDTO',
  base_experience: 150,
  height: 2,
  is_default: true,
  order: 1,
  weight: 1,
  abilities: [],
  held_items: [],
  location_area_encounters: '',
  moves: [],
  species: null,
  sprites: {
    front_default: '',
    front_shiny: '',
    front_female: '',
    front_shiny_female: '',
    back_default: '',
    back_shiny: '',
    back_female: '',
    back_shiny_female: '',
  },
  stats: [],
  types: [],
  past_types: [],
};

import { PokemonSpritesDTO } from './pokemonSpritesDTO';

export interface PokemonDTO {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: any[];
  held_items: any[];
  location_area_encounters: string;
  moves: any[];
  species: any;
  sprites: PokemonSpritesDTO;
  stats: any[];
  types: any[];
  past_types: any[];
}

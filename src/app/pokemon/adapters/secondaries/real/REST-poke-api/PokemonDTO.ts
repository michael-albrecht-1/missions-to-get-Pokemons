import { PokemonSpritesDTO } from './pokemonSpritesDTO';

export interface PokemonDTO {
  readonly id: number;
  readonly name: string;
  readonly base_experience: number;
  readonly height: number;
  readonly is_default: boolean;
  readonly order: number;
  readonly weight: number;
  readonly abilities: any[];
  readonly held_items: any[];
  readonly location_area_encounters: string;
  readonly moves: any[];
  readonly species: any;
  readonly sprites: PokemonSpritesDTO;
  readonly stats: any[];
  readonly types: PokemonTypeDTO[];
  readonly past_types: any[];
}

interface PokemonTypeDTO {
  slot: number;
  type: { name: string; url: string };
}

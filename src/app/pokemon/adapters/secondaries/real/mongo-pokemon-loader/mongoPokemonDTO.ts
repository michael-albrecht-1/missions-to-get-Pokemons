export interface MongoPokemonDTO {
  _id: string;
  __v: number;
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonTypeDTO[];
}

interface PokemonTypeDTO {
  slot: number;
  type: { name: string; url: string };
}

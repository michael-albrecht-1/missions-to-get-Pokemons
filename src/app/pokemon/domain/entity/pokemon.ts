import { PokemonSnapshot } from './pokemon.snapshot';

export class Pokemon {
  #number: string;
  #name: string;
  #description?: string;
  #weight: number;
  #height: number;
  #avatar: string;
  #types: string[];

  constructor({
    number,
    name,
    description,
    weight,
    height,
    avatar,
    types,
  }: PokemonSnapshot) {
    this.#number = number;
    this.#name = name;
    this.#description = description;
    this.#weight = weight;
    this.#height = height;
    this.#avatar = avatar;
    this.#types = types;
  }

  public hasType = (pokemonType: string): boolean => {
    return this.#types.includes(pokemonType);
  };

  public snapshot = (): PokemonSnapshot => ({
    number: this.#number,
    name: this.#name,
    description: this.#description,
    weight: this.#weight,
    height: this.#height,
    avatar: this.#avatar,
    types: this.#types,
  });
}

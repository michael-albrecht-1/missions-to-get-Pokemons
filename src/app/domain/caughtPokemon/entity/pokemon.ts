import { PokemonSnapshotType } from './pokemon-snapshot';

export class Pokemon {
  #number!: string;
  #name!: string;
  #description!: string;
  #weight!: number;
  #height!: number;
  #avatar!: string;
  #types: string[] = [];

  constructor(
    _number: string,
    _name: string,
    _description: string,
    _weight: number,
    _height: number,
    _avatar: string,
    _types: string[] = []
  ) {
    this.#number = _number;
    this.#name = _name;
    this.#description = _description;
    this.#weight = _weight;
    this.#height = _height;
    this.#avatar = _avatar;
    this.#types = _types;
  }

  public snapshot = (): PokemonSnapshotType => {
    return {
      number: this.#number,
      name: this.#name,
      description: this.#description,
      weight: this.#weight,
      height: this.#height,
      avatar: this.#avatar,
      types: this.#types,
    };
  };
}

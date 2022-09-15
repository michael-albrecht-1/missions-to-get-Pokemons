import { CaughtPokemonSnapshot } from './caughtPokemon.snapshot';

export class CaughtPokemon {
  #number!: String;
  #name!: String;
  #dateCreation!: Date | undefined;

  constructor(number: string, name: string, dateCreation?: Date) {
    this.#number = number;
    this.#name = name;
    this.#dateCreation = dateCreation;
  }

  public snapshot(): CaughtPokemonSnapshot {
    return {
      number: this.#number,
      name: this.#name,
      dateCreation: this.#dateCreation,
    };
  }
}

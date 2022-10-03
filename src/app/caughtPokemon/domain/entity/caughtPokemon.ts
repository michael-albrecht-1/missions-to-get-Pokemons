import { CaughtPokemonSnapshot } from './caughtPokemon.snapshot';

export class CaughtPokemon {
  #number: string;
  #name: string;
  #dateCreation?: Date;

  constructor({ number, name, dateCreation }: CaughtPokemonSnapshot) {
    (this.#number = number),
      (this.#name = name),
      (this.#dateCreation = dateCreation);
  }

  public snapshot = (): CaughtPokemonSnapshot => ({
    number: this.#number,
    name: this.#name,
    dateCreation: this.#dateCreation,
  });
}

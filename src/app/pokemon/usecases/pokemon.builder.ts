import { Pokemon } from '../entity/pokemon';

export class PokemonBuilder {
  protected _number!: string;
  protected _name!: string;
  protected _description!: string;
  protected _weight!: number;
  protected _height!: number;
  protected _avatar!: string;
  protected _types!: string[];

  withNumber(value: string): PokemonBuilder {
    this._number = value;
    return this;
  }

  withName(value: string): PokemonBuilder {
    this._name = value;
    return this;
  }

  withDescription(value: string): PokemonBuilder {
    this._description = value;
    return this;
  }

  withWeight(value: number): PokemonBuilder {
    this._weight = value;
    return this;
  }

  withHeight(value: number): PokemonBuilder {
    this._height = value;
    return this;
  }

  withAvatar(value: string): PokemonBuilder {
    this._avatar = value;
    return this;
  }

  withTypes(value: string[]): PokemonBuilder {
    this._types = value;
    return this;
  }

  build(): Pokemon {
    return {
      number: this._number,
      name: this._name,
      description: this._description,
      weight: this._weight,
      height: this._height,
      avatar: this._avatar,
      types: this._types,
    };
  }
}

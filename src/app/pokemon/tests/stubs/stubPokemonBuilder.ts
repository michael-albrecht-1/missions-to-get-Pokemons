import { PokemonBuilder } from '../../domain/pokemon.builder';

export class StubPokemonBuilder extends PokemonBuilder {
  protected override _number: string = '1';
  protected override _name: string = 'pikachu';
  protected override _description: string = 'pikachu description';
  protected override _weight: number = 0.36;
  protected override _height: number = 0.41;
  protected override _avatar: string = 'pikachu.png';
}

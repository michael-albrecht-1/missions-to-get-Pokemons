import { Pokemon } from 'src/app/domain/pokemon/entity/pokemon';
import { PokemonBuilder } from 'src/app/domain/pokemon/usecases/pokemon.builder';
import { PokemonDTO } from './PokemonDTO';

export class PokemonMapper {
  static mapToPokemon(pokemon: PokemonDTO): Pokemon {
    return new PokemonBuilder()
      .withNumber(pokemon.id)
      .withName(pokemon.name)
      .withDescription(pokemon.description)
      .withHeight(pokemon.height)
      .withWeight(pokemon.weight)
      .withAvatar(pokemon.avatar)
      .build();
  }
}

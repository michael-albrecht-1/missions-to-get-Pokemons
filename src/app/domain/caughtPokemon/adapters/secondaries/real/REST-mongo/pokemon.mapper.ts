import { PokemonSnapshotType } from 'src/app/domain/pokemon/entity/pokemon-snapshot';
import { PokemonBuilder } from 'src/app/domain/pokemon/usecases/pokemon.builder';
import { PokemonDTO } from './PokemonDTO';

export class PokemonMapper {
  static mapToPokemon(pokemon: PokemonDTO): PokemonSnapshotType {
    return new PokemonBuilder()
      .withNumber(pokemon.id)
      .withName(pokemon.name)
      .withDescription(pokemon.description)
      .withHeight(pokemon.height)
      .withWeight(pokemon.weight)
      .withAvatar(pokemon.avatar)
      .build()
      .snapshot();
  }
}

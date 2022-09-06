import { PokemonSnapshotType } from 'src/app/domain/pokemon/entity/pokemon-snapshot';
import { PokemonBuilder } from 'src/app/domain/pokemon/usecases/pokemon.builder';
import { PokemonDTO } from './PokemonDTO';

export class PokemonMapper {
  static mapToPokemon(pokemon: PokemonDTO): PokemonSnapshotType {
    return new PokemonBuilder()
      .withNumber(pokemon.id.toString())
      .withName(pokemon.name)
      .withDescription('')
      .withHeight(pokemon.height)
      .withWeight(pokemon.weight)
      .withAvatar(pokemon.sprites.front_default)
      .withTypes(pokemon.types.map((type) => type?.type?.name))
      .build()
      .snapshot();
  }
}

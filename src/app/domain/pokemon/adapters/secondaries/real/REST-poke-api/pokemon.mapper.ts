import { Pokemon } from 'src/app/domain/pokemon/entity/pokemon';
import { PokemonBuilder } from 'src/app/domain/pokemon/usecases/pokemon.builder';
import { PokemonDTO } from './PokemonDTO';

export class PokemonMapper {
  static mapToPokemon(pokemonDTO: PokemonDTO): Pokemon {
    return new PokemonBuilder()
      .withNumber(pokemonDTO.id.toString())
      .withName(pokemonDTO.name)
      .withDescription('')
      .withHeight(pokemonDTO.height)
      .withWeight(pokemonDTO.weight)
      .withAvatar(pokemonDTO.sprites.front_default)
      .withTypes(pokemonDTO.types.map((type) => type?.type?.name))
      .build();
  }
}

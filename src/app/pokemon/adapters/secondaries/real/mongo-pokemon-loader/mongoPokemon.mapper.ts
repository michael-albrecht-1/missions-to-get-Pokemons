import { Pokemon } from 'src/app/pokemon/domain/entity/pokemon';
import { PokemonBuilder } from 'src/app/pokemon/domain/pokemon.builder';
import { MongoPokemonDTO } from './mongoPokemonDTO';

export class MongoPokemonMapper {
  static mapToPokemon = (pokemonDTO: MongoPokemonDTO): Pokemon => {
    return new PokemonBuilder()
      .withNumber(pokemonDTO.id.toString())
      .withName(pokemonDTO.name)
      .withDescription('')
      .withHeight(pokemonDTO.height)
      .withWeight(pokemonDTO.weight)
      .withTypes(pokemonDTO.types.map((type) => type?.type?.name))
      .build();
  };
}

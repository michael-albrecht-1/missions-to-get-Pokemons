import { PokemonType } from 'src/app/domain/pokemon/entity/pokemon-type';
import { PokemonTypeInMemoryDTO } from './PokemonTypeInMemoryDTO';

export class PokemonTypeMapper {
  public static toPokemonType = (
    pokemonTypeDTO: PokemonTypeInMemoryDTO
  ): PokemonType => {
    return {
      name: pokemonTypeDTO.name,
      detailUrl: pokemonTypeDTO.url,
      logo: pokemonTypeDTO.logo,
    };
  };
}

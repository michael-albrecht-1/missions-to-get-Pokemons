import { IconName } from 'ngx-bootstrap-icons';
import { PokemonType } from 'src/app/pokemon/entity/pokemon-type';
import { PokemonTypeInMemoryDTO } from './PokemonTypeInMemoryDTO';

export class PokemonTypeMapper {
  public static toPokemonType = (
    pokemonTypeDTO: PokemonTypeInMemoryDTO
  ): PokemonType => {
    return {
      name: pokemonTypeDTO.name,
      detailUrl: pokemonTypeDTO.url,
      logo: pokemonTypeDTO.logo as IconName,
      color: pokemonTypeDTO.color,
    };
  };
}

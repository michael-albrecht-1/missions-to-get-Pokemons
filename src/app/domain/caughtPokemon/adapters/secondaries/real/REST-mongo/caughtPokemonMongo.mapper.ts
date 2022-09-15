import { CaughtPokemon } from 'src/app/domain/caughtPokemon/entity/caughtPokemon';
import { CaughtPokemonMongoDTO } from './caughtPokemonMongo.DTO';

export class CaughtPokemonMongoMapper {
  static toCaughtPokemon(
    caughtPokemonMongoDTO: CaughtPokemonMongoDTO
  ): CaughtPokemon {
    return {
      number: caughtPokemonMongoDTO.number,
      name: caughtPokemonMongoDTO.name,
      dateCreation: caughtPokemonMongoDTO.dateCreation,
    };
  }
  static toCaughtPokemonDTO(
    caughtPokemon: CaughtPokemon
  ): CaughtPokemonMongoDTO {
    return {
      number: caughtPokemon.number,
      name: caughtPokemon.name,
      dateCreation: caughtPokemon.dateCreation,
    };
  }
}

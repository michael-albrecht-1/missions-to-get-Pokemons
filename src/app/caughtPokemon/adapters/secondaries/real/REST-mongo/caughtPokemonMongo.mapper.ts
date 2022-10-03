import { CaughtPokemon } from 'src/app/caughtPokemon/domain/entity/caughtPokemon';
import { CaughtPokemonMongoDTO } from './caughtPokemonMongo.DTO';

export class CaughtPokemonMongoMapper {
  static toCaughtPokemon(
    caughtPokemonMongoDTO: CaughtPokemonMongoDTO
  ): CaughtPokemon {
    return new CaughtPokemon({
      number: caughtPokemonMongoDTO.number,
      name: caughtPokemonMongoDTO.name,
      dateCreation: caughtPokemonMongoDTO.dateCreation,
    });
  }
  static toCaughtPokemonDTO(
    caughtPokemon: CaughtPokemon
  ): CaughtPokemonMongoDTO {
    return {
      number: caughtPokemon.snapshot().number,
      name: caughtPokemon.snapshot().name,
      dateCreation: caughtPokemon.snapshot().dateCreation,
    };
  }
}

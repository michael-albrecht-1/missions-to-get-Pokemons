import { CaughtPokemonSnapshot } from 'src/app/domain/caughtPokemon/entity/caughtPokemon.snapshot';
import { CaughtPokemonMongoDTO } from './caughtPokemonMongo.DTO';

export class CaughtPokemonMongoMapper {
  static toCaughtPokemon(
    caughtPokemonMongoDTO: CaughtPokemonMongoDTO
  ): CaughtPokemonSnapshot {
    return {
      number: caughtPokemonMongoDTO.number,
      name: caughtPokemonMongoDTO.name,
      dateCreation: caughtPokemonMongoDTO.dateCreation,
    };
  }
}

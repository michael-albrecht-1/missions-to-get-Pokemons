import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CaughtPokemon } from 'src/app/domain/caughtPokemon/entity/caughtPokemon';
import { CaughtPokemonLoader } from 'src/app/domain/caughtPokemon/loaders/caughtPokemon.loader';
import { CaughtPokemonMongoDTO } from './caughtPokemonMongo.DTO';
import { CaughtPokemonMongoMapper } from './caughtPokemonMongo.mapper';

export class CaughtPokemonMongoLoader implements CaughtPokemonLoader {
  #baseUrl: string = 'http://localhost:5500';

  constructor(private http: HttpClient) {}

  get(): Observable<CaughtPokemon[]> {
    return this.http
      .get<CaughtPokemonMongoDTO[]>(`${this.#baseUrl}/caughtPokemons`)
      .pipe(
        map<CaughtPokemonMongoDTO[], CaughtPokemon[]>((missionsDTO) =>
          missionsDTO.map(CaughtPokemonMongoMapper.toCaughtPokemon)
        )
      );
  }
}

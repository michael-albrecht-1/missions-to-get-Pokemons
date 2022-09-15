import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { CaughtPokemonSnapshot } from 'src/app/domain/caughtPokemon/entity/caughtPokemon.snapshot';
import { CaughtPokemonLoader } from 'src/app/domain/caughtPokemon/loaders/caughtPokemon.loader';
import { CaughtPokemonMongoDTO } from './caughtPokemonMongo.DTO';
import { CaughtPokemonMongoMapper } from './caughtPokemonMongo.mapper';

export class CaughtPokemonMongoLoader implements CaughtPokemonLoader {
  #baseUrl: string = 'http://localhost:5500';

  constructor(private http: HttpClient) {}

  get(): Observable<CaughtPokemonSnapshot[]> {
    return this.http
      .get<CaughtPokemonMongoDTO[]>(`${this.#baseUrl}/caughtPokemons`)
      .pipe(
        map<CaughtPokemonMongoDTO[], CaughtPokemonSnapshot[]>((missionsDTO) =>
          missionsDTO.map(CaughtPokemonMongoMapper.toCaughtPokemon)
        )
      );
  }
}

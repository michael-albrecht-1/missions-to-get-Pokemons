import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CaughtPokemon } from 'src/app/domain/caughtPokemon/entity/caughtPokemon';
import { CaughtPokemonLoader } from 'src/app/domain/caughtPokemon/loaders/caughtPokemon.loader';
import { environment } from 'src/environments/environment';
import { CaughtPokemonMongoDTO } from './caughtPokemonMongo.DTO';
import { CaughtPokemonMongoMapper } from './caughtPokemonMongo.mapper';

export class CaughtPokemonMongoLoader implements CaughtPokemonLoader {
  #baseUrl: string = environment.mongoURL;

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

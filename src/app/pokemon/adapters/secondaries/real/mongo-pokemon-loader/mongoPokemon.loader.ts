import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/pokemon/domain/entity/pokemon';
import { PokemonLoader } from 'src/app/pokemon/usecases/loaders/PokemonLoader';
import { SearchResponse } from 'src/app/shared/mongoSearchResponse.interface';
import { environment } from 'src/environments/environment';
import { MongoPokemonMapper } from './mongoPokemon.mapper';
import { MongoPokemonDTO } from './mongoPokemonDTO';

export class MongoPokemonLoader implements PokemonLoader {
  #baseUrl: string = environment.mongoURL;

  constructor(private http: HttpClient) {}

  public search = (params?: any): Observable<SearchResponse<Pokemon[]>> => {
    const fullUrl = new URL(`${this.#baseUrl}/pokemons`);
    fullUrl.search = params ? new URLSearchParams(params).toString() : '';

    return this.http
      .get<SearchResponse<MongoPokemonDTO[]>>(fullUrl.toString())
      .pipe(
        map<SearchResponse<MongoPokemonDTO[]>, SearchResponse<Pokemon[]>>(
          (res) => ({
            ...res,
            data: res.data.map(MongoPokemonMapper.mapToPokemon),
          })
        )
      );
  };

  public get = (number: string): Observable<Pokemon> => {
    return this.http
      .get<MongoPokemonDTO>(`${this.#baseUrl}/pokemons/${number}`)
      .pipe(map<MongoPokemonDTO, Pokemon>(MongoPokemonMapper.mapToPokemon));
  };
}

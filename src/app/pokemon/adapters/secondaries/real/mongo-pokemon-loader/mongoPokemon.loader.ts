import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Mission } from 'src/app/mission/domain/entity/mission';
import { Pokemon } from 'src/app/pokemon/domain/entity/pokemon';
import { PokemonLoader } from 'src/app/pokemon/usecases/loaders/PokemonLoader';
import { environment } from 'src/environments/environment';
import { MongoPokemonMapper } from './mongoPokemon.mapper';
import { MongoPokemonDTO } from './mongoPokemonDTO';

export class MongoPokemonLoader implements PokemonLoader {
  #baseUrl: string = environment.mongoURL;

  constructor(private http: HttpClient) {}

  public all = (): Observable<Pokemon[]> => {
    return this.http
      .get<MongoPokemonDTO[]>(`${this.#baseUrl}/pokemons`)
      .pipe(
        map<MongoPokemonDTO[], Pokemon[]>((pokemonsDTO) =>
          pokemonsDTO.map(MongoPokemonMapper.mapToPokemon)
        )
      );
  };

  public get = (number: string): Observable<Pokemon> => {
    return this.http
      .get<MongoPokemonDTO>(`${this.#baseUrl}/pokemons/${number}`)
      .pipe(map<MongoPokemonDTO, Pokemon>(MongoPokemonMapper.mapToPokemon));
  };
}

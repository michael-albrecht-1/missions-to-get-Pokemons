import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { PokemonSnapshotType } from 'src/app/domain/pokemon/entity/pokemon-snapshot';
import { PokemonLoader } from '../../../../loaders/PokemonLoader';
import { PokemonMapper } from './pokemon.mapper';
import { PokemonDTO } from './PokemonDTO';

type PokemonNameAndLink = {
  name: string;
  url: string;
};

type PokeApiResponse = {
  count: number;
  next: string;
  previous: string;
  results: any[];
};

export class PokeApiPokemonLoader implements PokemonLoader {
  constructor(private http: HttpClient) {}

  all(): Observable<PokemonSnapshotType[]> {
    const stringPokemons = localStorage.getItem('pokemons');
    if (stringPokemons) {
      return of(JSON.parse(stringPokemons));
    }

    return this.http
      .get<PokeApiResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
      )
      .pipe(
        map<PokeApiResponse, PokemonNameAndLink[]>((res) => res.results),
        switchMap<PokemonNameAndLink[], Observable<PokemonDTO[]>>(
          (pokemonsNamesAndLinks) => {
            const pokemons = pokemonsNamesAndLinks.map(this.#getByLink);

            return combineLatest(pokemons);
          }
        ),
        map<PokemonDTO[], PokemonSnapshotType[]>((pokemons) =>
          pokemons.map(PokemonMapper.mapToPokemon)
        ),
        tap(this.#savePokemonsInStorage)
      );
  }

  get(number: string): Observable<PokemonSnapshotType> {
    const stringPokemons = localStorage.getItem('pokemons');
    if (stringPokemons) {
      return of(
        JSON.parse(stringPokemons).find(
          (pokemon: PokemonSnapshotType) => pokemon.number === number
        )
      );
    }

    return this.http
      .get<PokemonDTO>(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .pipe(map<PokemonDTO, PokemonSnapshotType>(PokemonMapper.mapToPokemon));
  }

  #getByLink = (
    pokemonNameAndLink: PokemonNameAndLink
  ): Observable<PokemonDTO> => {
    return this.http.get<PokemonDTO>(pokemonNameAndLink.url);
  };

  #savePokemonsInStorage = (pokemons: PokemonSnapshotType[]) => {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
  };
}

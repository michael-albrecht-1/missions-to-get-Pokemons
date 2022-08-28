import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { Pokemon } from '../../../../entity/pokemon';
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

export class RESTPokeApiPokemonLoader implements PokemonLoader {
  constructor(private http: HttpClient) {}

  all(): Observable<Pokemon[]> {
    return this.http
      .get<PokeApiResponse>('https://pokeapi.co/api/v2/pokemon')
      .pipe(
        map<PokeApiResponse, PokemonNameAndLink[]>((res) => res.results),
        switchMap<PokemonNameAndLink[], Observable<PokemonDTO[]>>(
          (pokemonsNamesAndLinks) => {
            const pokemons = pokemonsNamesAndLinks.map(this.#getByLink);

            return combineLatest(pokemons);
          }
        ),
        tap((a) => console.warn(a)),
        map<PokemonDTO[], Pokemon[]>((pokemons) =>
          pokemons.map(PokemonMapper.mapToPokemon)
        )
      );
  }

  get(number: string): Observable<Pokemon> {
    return this.http
      .get<PokemonDTO>(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .pipe(map<PokemonDTO, Pokemon>(PokemonMapper.mapToPokemon));
  }

  #getByLink = (
    pokemonNameAndLink: PokemonNameAndLink
  ): Observable<PokemonDTO> => {
    return this.http.get<PokemonDTO>(pokemonNameAndLink.url);
  };
}

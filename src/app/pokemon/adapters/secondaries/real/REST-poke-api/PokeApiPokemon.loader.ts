import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { Pokemon } from 'src/app/pokemon/domain/entity/pokemon';
import { PokemonLoader } from 'src/app/pokemon/usecases/loaders/PokemonLoader';
import { SearchResponse } from 'src/app/shared/mongoSearchResponse.interface';
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

  search(): Observable<SearchResponse<Pokemon[]>> {
    const pokemons = this.#getPokemonsFromStorage();
    if (pokemons) {
      return of({
        currentPage: 0,
        nbResults: pokemons.length,
        lastPage: 0,
        data: pokemons,
      });
    }

    return this.http
      .get<PokeApiResponse>(
        'https://pokeapi.co/api/v2/pokemon?limit=649&offset=0'
      )
      .pipe(
        map<PokeApiResponse, PokemonNameAndLink[]>((res) => res.results),
        switchMap<PokemonNameAndLink[], Observable<PokemonDTO[]>>(
          (pokemonsNamesAndLinks) => {
            const pokemons = pokemonsNamesAndLinks.map(this.#getByLink);

            return combineLatest(pokemons);
          }
        ),
        map<PokemonDTO[], Pokemon[]>((pokemons) =>
          pokemons.map(PokemonMapper.mapToPokemon)
        ),
        tap(this.#savePokemonsInStorage),
        map<Pokemon[], SearchResponse<Pokemon[]>>((pokemons) => ({
          currentPage: 0,
          nbResults: pokemons.length,
          lastPage: 0,
          data: pokemons,
        }))
      );
  }

  get(number: string): Observable<Pokemon> {
    const pokemons = this.#getPokemonsFromStorage();
    if (pokemons) {
      const pokemon = pokemons.find(
        (pokemon: Pokemon) => pokemon.snapshot().number === number
      );

      if (pokemon) {
        return of(pokemon);
      }
    }

    return this.http
      .get<PokemonDTO>(`https://pokeapi.co/api/v2/pokemon/${number}`)
      .pipe(map<PokemonDTO, Pokemon>(PokemonMapper.mapToPokemon));
  }

  #getByLink = (
    pokemonNameAndLink: PokemonNameAndLink
  ): Observable<PokemonDTO> => {
    return this.http.get<PokemonDTO>(pokemonNameAndLink.url);
  };

  #savePokemonsInStorage = (pokemons: Pokemon[]) => {
    const pokemonsSnapshots = pokemons.map((p) => p.snapshot());
    localStorage.setItem(
      'pokemonsSnapshots',
      JSON.stringify(pokemonsSnapshots)
    );
  };

  #getPokemonsFromStorage = (): Pokemon[] | null => {
    const stringPokemonsSnapshots = localStorage.getItem('pokemonsSnapshots');
    if (!stringPokemonsSnapshots) {
      return null;
    }

    const pokemonsSnapshots = JSON.parse(stringPokemonsSnapshots);
    return pokemonsSnapshots.map((p: any): Pokemon => new Pokemon(p));
  };
}

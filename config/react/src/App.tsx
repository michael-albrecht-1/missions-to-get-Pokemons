import { useEffect, useState } from 'react';
import { PokeApiPokemonLoader } from '../../../src/app/pokemon/adapters/secondaries/real/REST-poke-api/PokeApiPokemon.loader';
import { Pokemon } from '../../../src/app/pokemon/domain/entity/pokemon';
import { ISearchAllPokemons } from '../../../src/app/pokemon/usecases/ISearchAllPokemons';
import { PokemonLoader } from '../../../src/app/pokemon/usecases/loaders/PokemonLoader';
import './App.css';
import { ObservableRESTClient } from '../../clients/observable.RESTClient';

function App() {
  const pokemonsSouce: PokemonLoader = new PokeApiPokemonLoader(
    new ObservableRESTClient()
  );
  const iSearchAllPokemons = new ISearchAllPokemons(pokemonsSouce);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    iSearchAllPokemons.execute().subscribe((pokemons: Pokemon[]) => {
      setPokemons(pokemons);
    });
  }, []);

  return (
    <div className="App">
      poke app
      <ul>
        {pokemons.map((p: Pokemon) => (
          <li>{p.snapshot().name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

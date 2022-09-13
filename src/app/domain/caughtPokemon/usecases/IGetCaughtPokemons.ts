import { Observable } from 'rxjs';
import { Usecase } from 'src/app/base/usecase.interface';
import { CaughtPokemonLoader } from '../loaders/caughtPokemon.loader';

export class IGetCaughtPokemons implements Usecase<any> {
  constructor(private caughtPokemonSource: CaughtPokemonLoader) {}

  execute = (): Observable<any> => {
    return this.caughtPokemonSource.get();
  };
}

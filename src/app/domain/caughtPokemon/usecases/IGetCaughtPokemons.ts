import { Observable } from 'rxjs';
import { Usecase } from 'src/app/base/usecase.interface';
import { CaughtPokemon } from '../entity/caughtPokemon';
import { CaughtPokemonLoader } from '../loaders/caughtPokemon.loader';

export class IGetCaughtPokemons
  implements Usecase<Observable<CaughtPokemon[]>>
{
  constructor(private caughtPokemonSource: CaughtPokemonLoader) {}

  execute = (): Observable<CaughtPokemon[]> => {
    return this.caughtPokemonSource.get();
  };
}

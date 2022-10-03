import { Observable } from 'rxjs';
import { Usecase } from 'src/app/shared/usecase.interface';
import { CaughtPokemon } from '../domain/entity/caughtPokemon';
import { CaughtPokemonLoader } from '../domain/loaders/caughtPokemon.loader';

export class IGetCaughtPokemons
  implements Usecase<Observable<CaughtPokemon[]>>
{
  constructor(private caughtPokemonSource: CaughtPokemonLoader) {}

  execute = (): Observable<CaughtPokemon[]> => {
    return this.caughtPokemonSource.get();
  };
}

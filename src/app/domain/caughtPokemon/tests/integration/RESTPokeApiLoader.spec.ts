import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CaughtPokemonMongoLoader } from '../../adapters/secondaries/real/REST-mongo/caughtPokemonMongo.loader';
import { CaughtPokemon } from '../../entity/caughtPokemon';
import { CaughtPokemonSnapshot } from '../../entity/caughtPokemon.snapshot';
import { CaughtPokemonLoader } from '../../loaders/caughtPokemon.loader';
import { IGetCaughtPokemons } from '../../usecases/IGetCaughtPokemons';

describe('Integration | CaughtPokemonLoader (Mongo) fetches', () => {
  it('A pokemon', (done) => {
    const fakeHttpClient = { get: () => of() } as unknown as HttpClient;

    const expectedCaughtPokemon: CaughtPokemonSnapshot = new CaughtPokemon(
      '42',
      'ronflex'
    ).snapshot();

    const caughtPokemonLoader: CaughtPokemonLoader =
      new CaughtPokemonMongoLoader(fakeHttpClient);

    new IGetCaughtPokemons(caughtPokemonLoader)
      .execute()
      .subscribe((caughtPokemons: CaughtPokemonSnapshot[]) => {
        expect(caughtPokemons).toEqual([expectedCaughtPokemon]);
        expect(fakeHttpClient.get).toHaveBeenCalledTimes(1);
        done();
      });
  });
});

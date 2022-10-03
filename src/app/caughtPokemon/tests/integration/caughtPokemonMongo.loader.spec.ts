import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CaughtPokemonMongoLoader } from '../../adapters/secondaries/real/REST-mongo/caughtPokemonMongo.loader';
import { CaughtPokemonMongoMapper } from '../../adapters/secondaries/real/REST-mongo/caughtPokemonMongo.mapper';
import { CaughtPokemon } from '../../domain/entity/caughtPokemon';
import { CaughtPokemonLoader } from '../../domain/loaders/caughtPokemon.loader';
import { IGetCaughtPokemons } from '../../usecases/IGetCaughtPokemons';

describe('Integration | CaughtPokemonLoader (Mongo) fetches', () => {
  it('A pokemon', (done) => {
    const fakeHttpClient = { get: () => of() } as unknown as HttpClient;

    const expectedCaughtPokemon: CaughtPokemon = {
      number: '42',
      name: 'ronflex',
    };

    const fakeMongoResponse = CaughtPokemonMongoMapper.toCaughtPokemonDTO(
      expectedCaughtPokemon
    );

    const caughtPokemonLoader: CaughtPokemonLoader =
      new CaughtPokemonMongoLoader(fakeHttpClient);

    spyOn(fakeHttpClient, 'get').and.returnValue(of([fakeMongoResponse]));

    new IGetCaughtPokemons(caughtPokemonLoader)
      .execute()
      .subscribe((caughtPokemons: CaughtPokemon[]) => {
        expect(caughtPokemons[0].number).toEqual(expectedCaughtPokemon.number);
        expect(caughtPokemons[0].name).toEqual(expectedCaughtPokemon.name);
        expect(caughtPokemons.length).toEqual(1);
        expect(fakeHttpClient.get).toHaveBeenCalledTimes(1);
        done();
      });
  });
});

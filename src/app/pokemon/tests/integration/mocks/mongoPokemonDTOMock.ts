import { MongoPokemonDTO } from 'src/app/pokemon/adapters/secondaries/real/mongo-pokemon-loader/mongoPokemonDTO';

export const MongoPokemonDTOMock: MongoPokemonDTO[] = [
  {
    _id: '636c8272aeb9f9739474ad23',
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    types: [
      {
        slot: 1,
        type: {
          name: 'electric',
          url: 'https://pokeapi.co/api/v2/type/13/',
        },
      },
    ],
    __v: 0,
  },
  {
    _id: '636c8272aeb9f9739474ad3c',
    id: 50,
    name: 'diglett',
    height: 2,
    weight: 8,
    types: [
      {
        slot: 1,
        type: {
          name: 'ground',
          url: 'https://pokeapi.co/api/v2/type/5/',
        },
      },
    ],
    __v: 0,
  },
];

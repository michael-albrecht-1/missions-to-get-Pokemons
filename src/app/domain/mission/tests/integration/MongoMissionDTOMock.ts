import { Uuid } from 'src/app/domain/shared/value-object/uuid';
import { MongoMissionDTO } from '../../adapters/secondaries/real/mongoMissionDTO';

export const MongoMissionDTOMock: MongoMissionDTO = {
  uuid: Uuid.random().toString(),
  title: 'title',
  description: 'description',
  rewards: [],
};

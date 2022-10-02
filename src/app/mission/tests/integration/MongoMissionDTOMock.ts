import { Uuid } from 'src/app/shared/value-object/uuid';
import { MongoMissionDTO } from '../../adapters/secondaries/real/mongoMission.DTO';

export const MongoMissionDTOMock: MongoMissionDTO = {
  uuid: Uuid.random().toString(),
  title: 'title',
  description: 'description',
  rewards: [],
};

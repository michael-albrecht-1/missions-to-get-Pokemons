import { Uuid } from 'src/app/domain/shared/value-object/uuid';

export interface MongoMissionDTO {
  uuid: Uuid;
  title: string;
  description: string;
  rewards: any[];
}

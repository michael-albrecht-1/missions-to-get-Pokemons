import { MissionStatus } from '../../../shared/MissionStatus';

export interface MongoMissionDTO {
  uuid: string;
  title: string;
  description: string;
  rewards: string[];
  status?: MissionStatus;
  dateCreation?: Date;
}

import { MissionReward } from '../../../shared/MissionReward';
import { MissionStatus } from '../../../shared/MissionStatus';

export interface MongoMissionDTO {
  uuid: string;
  title: string;
  description: string;
  rewards: MissionReward[];
  status?: MissionStatus;
  dateCreation?: Date;
}

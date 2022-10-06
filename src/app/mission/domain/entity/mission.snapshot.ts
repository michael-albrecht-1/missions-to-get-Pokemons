import { MissionReward } from '../../shared/MissionReward';
import { MissionStatus } from '../../shared/MissionStatus';

export interface MissionSnapshot {
  readonly uuid: string;
  readonly name: string;
  readonly description: string;
  readonly rewards: MissionReward[];
  readonly status: MissionStatus;
  readonly dateCreation?: Date;
}

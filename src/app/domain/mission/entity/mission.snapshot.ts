import { MissionStatus } from '../shared/MissionStatus';

export interface MissionSnapshot {
  readonly uuid: string;
  readonly name: string;
  readonly description: string;
  readonly rewards: string[];
  readonly status?: MissionStatus;
  readonly dateCreation?: Date;
}

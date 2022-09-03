import { Uuid } from '../../shared/value-object/uuid';

export interface MissionSnapshot {
  readonly uuid: Uuid;
  readonly name: string;
  readonly description: string;
  readonly rewards: any[];
}

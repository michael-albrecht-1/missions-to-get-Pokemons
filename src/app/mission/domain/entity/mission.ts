import { Uuid } from '../../../shared/value-object/uuid';
import { MissionReward } from '../../shared/MissionReward';
import { MissionStatus } from '../../shared/MissionStatus';
import { MissionSnapshot } from './mission.snapshot';

export class Mission {
  #uuid!: string;
  #name!: string;
  #description!: string;
  #rewards!: MissionReward[];
  #status!: MissionStatus;
  #dateCreation?: Date;

  constructor({
    uuid,
    name,
    description,
    rewards,
    status,
    dateCreation,
  }: {
    uuid?: string;
    name: string;
    description: string;
    rewards: MissionReward[];
    status: MissionStatus;
    dateCreation?: Date;
  }) {
    if (!rewards.length) {
      throw new Error('Mission creation failed, there is no reward');
    }
    if (!name) {
      throw new Error('Mission creation failed, name is missing');
    }

    this.#uuid = uuid ?? Uuid.random().toString();

    this.#name = name;
    this.#description = description;
    this.#rewards = rewards;
    this.#status = status ?? 'created';
    this.#dateCreation = dateCreation;
  }

  public snapshot(): MissionSnapshot {
    return {
      uuid: this.#uuid,
      name: this.#name,
      description: this.#description,
      rewards: this.#rewards,
      status: this.#status,
      dateCreation: this.#dateCreation,
    };
  }
}

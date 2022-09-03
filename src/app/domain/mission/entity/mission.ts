import { Uuid } from '../../shared/value-object/uuid';
import { MissionSnapshot } from './mission-snapshot';

export class Mission {
  #uuid: Uuid = Uuid.random();
  #name!: string;
  #description!: string;
  #rewards!: any[];

  constructor(_name: string, _description: string, _rewards: any[]) {
    this.#name = _name;
    this.#description = _description;
    this.#rewards = _rewards;
  }

  public snapshot(): MissionSnapshot {
    return {
      uuid: this.#uuid,
      name: this.#name,
      description: this.#description,
      rewards: this.#rewards,
    };
  }
}

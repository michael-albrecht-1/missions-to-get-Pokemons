import { Uuid } from '../../shared/value-object/uuid';
import { MissionSnapshot } from './mission-snapshot';

export class Mission {
  #uuid: string = Uuid.random().toString();
  #name!: string;
  #description!: string;
  #reward!: string;

  constructor(_name: string, _description: string, _reward: string) {
    if (!_name || !_description || !_reward) {
      throw new Error("La mission n'est pas completement renseignée");
    }

    this.#name = _name;
    this.#description = _description;
    this.#reward = _reward;
  }

  public snapshot(): MissionSnapshot {
    return {
      uuid: this.#uuid,
      name: this.#name,
      description: this.#description,
      reward: this.#reward,
    };
  }
}

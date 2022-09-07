import { Mission } from './mission';

export class MissionBuilder {
  protected _uuid!: string;
  protected _name!: string;
  protected _description!: string;
  protected _rewards!: string[];

  withUuid(value: string): MissionBuilder {
    this._uuid = value;
    return this;
  }

  withName(value: string): MissionBuilder {
    this._name = value;
    return this;
  }

  withDescription(value: string): MissionBuilder {
    this._description = value;
    return this;
  }

  withRewards(value: string[]): MissionBuilder {
    this._rewards = value;
    return this;
  }

  build(): Mission {
    return new Mission(this._name, this._description, this._rewards);
  }
}

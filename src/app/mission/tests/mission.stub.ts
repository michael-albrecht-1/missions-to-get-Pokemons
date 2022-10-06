import { Uuid } from '../../shared/value-object/uuid';
import { MissionBuilder } from '../domain/mission.builder';
import { MissionReward } from '../shared/MissionReward';
import { MissionStatus } from '../shared/MissionStatus';

export class MissionStub extends MissionBuilder {
  protected override _uuid: string = Uuid.random().value;
  protected override _name: string = 'Décorer le gateau au chocolat';
  protected override _description: string = 'Avec des smarties';
  protected override _rewards: MissionReward[] = [
    { name: 'ronflex', number: '42' },
  ];
}

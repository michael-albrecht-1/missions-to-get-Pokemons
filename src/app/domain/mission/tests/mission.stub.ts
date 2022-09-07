import { Uuid } from '../../shared/value-object/uuid';
import { MissionBuilder } from '../entity/mission.builder';

export class MissionStub extends MissionBuilder {
  protected override _uuid: string = Uuid.random().value;
  protected override _name: string = 'Décorer le gateau au chocolat';
  protected override _description: string = 'Avec des smarties';
  protected override _rewards: string[] = ['ronflex, salameche'];
}

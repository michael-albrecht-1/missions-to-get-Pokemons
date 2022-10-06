import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { MissionLoader } from '../usecases/loaders/mission.loader';
import { ICompleteAMission } from '../usecases/ICompleteAMission';
import { MissionStub } from './mission.stub';
import { Mission } from '../domain/entity/mission';

describe('As a parent, I complete a mission', () => {
  it('who will be return with status completed', (done) => {
    const missionStub = new MissionStub().build();
    const expectResult = new MissionStub('done').build();

    const missionSource: MissionLoader = new InMemoryMissionLoader([
      missionStub,
    ]);
    new ICompleteAMission(missionSource)
      .execute(missionStub)
      .subscribe((mission: Mission) => {
        expect(mission.snapshot().name).toEqual(expectResult.snapshot().name);
        expect(mission.snapshot().status).toEqual(
          expectResult.snapshot().status
        );
        done();
      });
  });
});

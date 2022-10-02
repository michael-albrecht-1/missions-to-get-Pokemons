import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { MissionSnapshot } from '../entity/mission.snapshot';
import { MissionLoader } from '../loaders/mission.loader';
import { MissionStatus } from '../shared/MissionStatus';
import { ICompleteAMission } from '../usecases/ICompleteAMission';
import { MissionStub } from './mission.stub';

describe('As a parent, I complete a mission', () => {
  it('who will be return with status completed', (done) => {
    const missionStub = new MissionStub().build().snapshot();
    const expectResult: MissionSnapshot = {
      ...missionStub,
      status: MissionStatus.done,
    };

    const missionSource: MissionLoader = new InMemoryMissionLoader([
      missionStub,
    ]);
    new ICompleteAMission(missionSource)
      .execute(expectResult)
      .subscribe((mission: MissionSnapshot) => {
        verifyMission(mission, expectResult);
        done();
      });
  });

  function verifyMission(
    mission: MissionSnapshot,
    expectedMission: MissionSnapshot
  ) {
    expect(mission.name).toBe(expectedMission.name);
    expect(mission.description).toBe(expectedMission.description);
    expect(mission.rewards.length).toBe(expectedMission.rewards.length);
    expect(mission.status).toBe(expectedMission.status);
  }
});

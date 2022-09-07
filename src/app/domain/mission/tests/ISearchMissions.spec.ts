import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { MissionSnapshot } from '../entity/mission.snapshot';
import { ISearchMissions } from '../usecases/ISearchMissions';
import { MissionStub } from './mission.stub';

fdescribe('As a user, I search missions and', () => {
  let mission1: MissionSnapshot;

  beforeEach(() => {
    mission1 = new MissionStub().withName('Laver le chien').build().snapshot();
  });

  it('find 0 result', (done) => {
    const missionSource = new InMemoryMissionLoader([]);

    new ISearchMissions(missionSource)
      .execute()
      .subscribe((missions: MissionSnapshot[]) => {
        expect(missions.length).toEqual(0);
        done();
      });
  });

  it('find 1 result', (done) => {
    const missionSource = new InMemoryMissionLoader([mission1]);

    new ISearchMissions(missionSource)
      .execute()
      .subscribe((missions: MissionSnapshot[]) => {
        expect(missions.length).toEqual(1);
        done();
      });
  });
});

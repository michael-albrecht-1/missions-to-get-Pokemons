import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { Mission } from '../domain/entity/mission';
import { ISearchMissions } from '../usecases/ISearchMissions';
import { MissionStub } from './mission.stub';

describe('As a user, I search missions and', () => {
  let mission1: Mission;

  beforeEach(() => {
    mission1 = new MissionStub().withName('Laver le chien').build();
  });

  it('find 0 result', (done) => {
    const missionSource = new InMemoryMissionLoader([]);

    new ISearchMissions(missionSource)
      .execute()
      .subscribe((missions: Mission[]) => {
        expect(missions.length).toEqual(0);
        done();
      });
  });

  it('find 1 result', (done) => {
    const missionSource = new InMemoryMissionLoader([mission1]);

    new ISearchMissions(missionSource)
      .execute()
      .subscribe((missions: Mission[]) => {
        verifyMissions(missions, [mission1]);
        done();
      });
  });

  it('find 2 result', (done) => {
    const mission2 = new MissionStub().withName('Faire un gateau !').build();
    const missionSource = new InMemoryMissionLoader([mission1, mission2]);

    new ISearchMissions(missionSource)
      .execute()
      .subscribe((missions: Mission[]) => {
        verifyMissions(missions, [mission1, mission2]);
        done();
      });
  });
});

function verifyMissions(missions: Mission[], expectedMissions: Mission[]) {
  expect(missions.length).toEqual(expectedMissions.length);
  missions.forEach((mission, index) =>
    expect(mission.snapshot()).toEqual(expectedMissions[index].snapshot())
  );
}

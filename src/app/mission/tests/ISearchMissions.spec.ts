import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { MissionSnapshot } from '../domain/entity/mission.snapshot';
import { ISearchMissions } from '../usecases/ISearchMissions';
import { MissionStub } from './mission.stub';

describe('As a user, I search missions and', () => {
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
        verifyMissions(missions, [mission1]);
        done();
      });
  });

  it('find 2 result', (done) => {
    const mission2 = new MissionStub()
      .withName('Faire un gateau !')
      .build()
      .snapshot();
    const missionSource = new InMemoryMissionLoader([mission1, mission2]);

    new ISearchMissions(missionSource)
      .execute()
      .subscribe((missions: MissionSnapshot[]) => {
        verifyMissions(missions, [mission1, mission2]);
        done();
      });
  });
});

function verifyMissions(
  missions: MissionSnapshot[],
  expectedMissions: MissionSnapshot[]
) {
  expect(missions.length).toEqual(expectedMissions.length);
  missions.forEach((mission, index) =>
    verifyMission(mission, expectedMissions[index])
  );
}
function verifyMission(
  mission: MissionSnapshot,
  expectedMission: MissionSnapshot
) {
  expect(mission.name).toBe(expectedMission.name);
  expect(mission.description).toBe(expectedMission.description);
  expect(mission.rewards.length).toBe(expectedMission.rewards.length);
}

import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { ICreateAMission } from '../usecases/ICreateAMission';

describe('As a parent, I create a mission', () => {
  const expectedResult = {
    name: 'Make cookies !',
    description: 'Make delicious cookies with dad or mum.',
    rewards: [],
  };

  beforeEach(() => {});

  it('that contain an uuid, a name, a descrition and a list of rewards', () => {
    const { name, description, rewards } = expectedResult;

    const missionSource = new InMemoryMissionLoader([]);

    new ICreateAMission(missionSource)
      .execute(name, description, rewards)
      .subscribe((mission: any) => {
        expect(mission.name).toBe(expectedResult.name);
        expect(mission.description).toBe(expectedResult.description);
        expect(mission.rewards).toBe(expectedResult.rewards);
      });
  });
});

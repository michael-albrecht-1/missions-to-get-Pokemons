import { MissionSnapshot } from '../../../entity/mission-snapshot';
import { MongoMissionDTO } from './mongoMissionDTO';

export class MongoMissionMapper {
  static mapToMission = (mongoMissionDTO: MongoMissionDTO): MissionSnapshot => {
    return {
      uuid: mongoMissionDTO.uuid,
      name: mongoMissionDTO.title,
      description: mongoMissionDTO.description,
      rewards: mongoMissionDTO.rewards,
    };
  };

  static mapToMissionDTO = (
    missionSnapshot: MissionSnapshot
  ): MongoMissionDTO => {
    return {
      uuid: missionSnapshot.uuid,
      title: missionSnapshot.name,
      description: missionSnapshot.description,
      rewards: missionSnapshot.rewards,
    };
  };
}

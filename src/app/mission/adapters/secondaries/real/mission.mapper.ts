import { MissionSnapshot } from '../../../domain/entity/mission.snapshot';
import { MongoMissionDTO } from './mongoMission.DTO';

export class MongoMissionMapper {
  static mapToMission = (mongoMissionDTO: MongoMissionDTO): MissionSnapshot => {
    return {
      uuid: mongoMissionDTO.uuid,
      name: mongoMissionDTO.title,
      description: mongoMissionDTO.description,
      rewards: mongoMissionDTO.rewards,
      status: mongoMissionDTO.status,
      dateCreation: mongoMissionDTO.dateCreation,
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
      status: missionSnapshot.status,
      dateCreation: missionSnapshot.dateCreation,
    };
  };
}

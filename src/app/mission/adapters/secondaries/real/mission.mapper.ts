import { Mission } from 'src/app/mission/domain/entity/mission';
import { MongoMissionDTO } from './mongoMission.DTO';

export class MongoMissionMapper {
  static mapToMission = (mongoMissionDTO: MongoMissionDTO): Mission => {
    return new Mission({
      uuid: mongoMissionDTO.uuid,
      name: mongoMissionDTO.title,
      description: mongoMissionDTO.description,
      rewards: mongoMissionDTO.rewards,
      status: mongoMissionDTO.status,
      dateCreation: mongoMissionDTO.dateCreation,
    });
  };

  static mapToMissionDTO = (mission: Mission): MongoMissionDTO => {
    return {
      uuid: mission.snapshot().uuid,
      title: mission.snapshot().name,
      description: mission.snapshot().description,
      rewards: mission.snapshot().rewards,
      status: mission.snapshot().status,
      dateCreation: mission.snapshot().dateCreation,
    };
  };
}

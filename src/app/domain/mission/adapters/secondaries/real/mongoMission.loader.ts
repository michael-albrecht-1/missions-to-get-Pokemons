import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MissionSnapshot } from '../../../entity/mission.snapshot';
import { MissionLoader } from '../../../loaders/mission.loader';
import { MongoMissionMapper } from './mission.mapper';
import { MongoMissionDTO } from './mongoMissionDTO';

export class MongoMissionLoader implements MissionLoader {
  #baseUrl: string = environment.mongoURL;

  constructor(private http: HttpClient) {}

  post(mission: MissionSnapshot): Observable<MissionSnapshot> {
    const missionDTO = MongoMissionMapper.mapToMissionDTO(mission);

    return this.http
      .post<MongoMissionDTO>(`${this.#baseUrl}/missions`, missionDTO)
      .pipe(
        map<MongoMissionDTO, MissionSnapshot>(MongoMissionMapper.mapToMission)
      );
  }

  search(): Observable<MissionSnapshot[]> {
    return this.http
      .get<MongoMissionDTO[]>(`${this.#baseUrl}/missions`)
      .pipe(
        map<MongoMissionDTO[], MissionSnapshot[]>((missionsDTO) =>
          missionsDTO.map(MongoMissionMapper.mapToMission)
        )
      );
  }

  complete(mission: MissionSnapshot): Observable<MissionSnapshot> {
    return this.http
      .patch<MongoMissionDTO>(
        `${this.#baseUrl}/missions/complete/${mission.uuid}`,
        mission
      )
      .pipe(
        map<MongoMissionDTO, MissionSnapshot>(MongoMissionMapper.mapToMission)
      );
  }
}

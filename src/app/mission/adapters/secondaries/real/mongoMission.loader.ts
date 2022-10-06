import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Mission } from 'src/app/mission/domain/entity/mission';
import { environment } from 'src/environments/environment';
import { MissionLoader } from '../../../usecases/loaders/mission.loader';
import { MongoMissionMapper } from './mission.mapper';
import { MongoMissionDTO } from './mongoMission.DTO';

export class MongoMissionLoader implements MissionLoader {
  #baseUrl: string = environment.mongoURL;

  constructor(private http: HttpClient) {}

  post(mission: Mission): Observable<Mission> {
    const missionDTO = MongoMissionMapper.mapToMissionDTO(mission);

    return this.http
      .post<MongoMissionDTO>(`${this.#baseUrl}/missions`, missionDTO)
      .pipe(map<MongoMissionDTO, Mission>(MongoMissionMapper.mapToMission));
  }

  search(): Observable<Mission[]> {
    return this.http
      .get<MongoMissionDTO[]>(`${this.#baseUrl}/missions`)
      .pipe(
        map<MongoMissionDTO[], Mission[]>((missionsDTO) =>
          missionsDTO.map(MongoMissionMapper.mapToMission)
        )
      );
  }

  complete(mission: Mission): Observable<Mission> {
    return this.http
      .patch<MongoMissionDTO>(
        `${this.#baseUrl}/missions/complete/${mission.snapshot().uuid}`,
        mission
      )
      .pipe(map<MongoMissionDTO, Mission>(MongoMissionMapper.mapToMission));
  }
}

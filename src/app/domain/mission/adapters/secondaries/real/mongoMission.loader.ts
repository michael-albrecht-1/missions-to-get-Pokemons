import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { MissionSnapshot } from '../../../entity/mission.snapshot';
import { MissionLoader } from '../../../loaders/mission.loader';
import { MongoMissionMapper } from './mission.mapper';
import { MongoMissionDTO } from './mongoMissionDTO';

export class MongoMissionLoader implements MissionLoader {
  constructor(private http: HttpClient) {}

  post(mission: MissionSnapshot): Observable<MissionSnapshot> {
    const missionDTO = MongoMissionMapper.mapToMissionDTO(mission);

    return this.http
      .post<MongoMissionDTO>('http://localhost:5500' + '/missions', missionDTO)
      .pipe(
        map<MongoMissionDTO, MissionSnapshot>(MongoMissionMapper.mapToMission)
      );
  }

  search(): Observable<MissionSnapshot[]> {
    return of();
  }
}

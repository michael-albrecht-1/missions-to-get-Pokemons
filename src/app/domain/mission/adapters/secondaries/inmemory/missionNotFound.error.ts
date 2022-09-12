export class MissionNotFoundError extends Error {
  constructor(missionUuid: string) {
    super(`Mission with uuid ${missionUuid} not found`);
  }
}

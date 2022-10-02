import { IconName } from 'ngx-bootstrap-icons';

export class PokemonType {
  constructor(
    readonly name: string,
    readonly detailUrl: string,
    readonly logo: IconName,
    readonly color: string
  ) {}
}

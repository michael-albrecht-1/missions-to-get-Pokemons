export interface PokemonSnapshot {
  readonly number: string;
  readonly name: string;
  readonly description?: string;
  readonly weight: number;
  readonly height: number;
  readonly avatar: string;
  readonly types: string[];
}

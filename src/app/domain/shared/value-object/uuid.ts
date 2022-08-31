import { uuid } from 'uuidv4';
import { isUuid } from 'uuidv4';
import { InvalidArgumentError } from './invalidArgumentError';

export class Uuid {
  readonly value: string;

  constructor(value: string) {
    this.ensureIsValidUuid(value);

    this.value = value;
  }

  static random(): Uuid {
    return new Uuid(uuid());
  }

  private ensureIsValidUuid(id: string): void {
    if (!isUuid(id)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${id}>`
      );
    }
  }

  toString(): string {
    return this.value;
  }
}

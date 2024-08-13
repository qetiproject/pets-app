export class DeleteResponseDto {
  raw: unknown[];
  affected?: number;

  constructor(raw: unknown[], affected: number) {
    this.raw = raw;
    this.affected = affected;
  }
}

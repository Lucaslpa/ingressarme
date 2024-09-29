export class Response<T> {
  constructor(
    readonly isSuccess: boolean,
    readonly data: T | null,
    readonly errors: string[],
  ) {}
}

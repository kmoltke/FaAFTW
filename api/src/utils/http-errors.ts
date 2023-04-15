export class HttpError extends Error {
  constructor(public statusCode: number, error: string) {
    super(error)
  }
}

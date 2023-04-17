/**
 * Error class to customize error handling
 */
export class HttpError extends Error {
  constructor(public statusCode: number, error: string) {
    super(error)
  }
}

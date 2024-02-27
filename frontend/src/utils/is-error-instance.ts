export function isErrorInstance(error: unknown): error is Error {
  return error instanceof Error
}

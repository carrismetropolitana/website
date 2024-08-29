export type ServerActionResult<T> =
  | { error: string, success: false }
  | { success: true, value: T };

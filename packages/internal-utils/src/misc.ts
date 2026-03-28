/**
 * Returns a promise that resolves after given timeout in milliseconds
 */
export function timeout(timeout: number) {
  return new Promise<void>((r) => setTimeout(r, timeout));
}

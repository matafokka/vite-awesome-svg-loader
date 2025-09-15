export function isIterable(value: any): value is Iterable<any> {
  return value && typeof value !== "string" && Symbol.iterator in value
}
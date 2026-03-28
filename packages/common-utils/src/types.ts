/**
 * An array of elements or a single element
 */
export type MaybeArray<T> = T | T[];

/**
 * Picks keys of specified type
 */
export type PickKeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? T[K] : never };

/**
 * Keys of specified type
 */
export type KeysOfType<T, U> = keyof PickKeysOfType<T, U>;

/**
 * Makes specified keys non-nullable and required
 */
export type RequiredKeys<T, U extends keyof T> = Omit<T, U> & { [K in U]-?: NonNullable<T[K]> };

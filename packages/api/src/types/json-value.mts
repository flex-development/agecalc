/**
 * @file Type Aliases - JsonValue
 * @module agecalc/api/types/JsonValue
 */

import type {
  JsonArray,
  JsonObject,
  JsonPrimitive
} from '@flex-development/agecalc-api/types'

/**
 * [JSON][] data types.
 *
 * [json]: https://restfulapi.net/json-data-types
 *
 * @see {@linkcode JsonArray}
 * @see {@linkcode JsonObject}
 * @see {@linkcode JsonPrimitive}
 */
type JsonValue = JsonArray | JsonObject | JsonPrimitive

export type { JsonValue as default }

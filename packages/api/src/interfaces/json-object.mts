/**
 * @file Interfaces - JsonObject
 * @module agecalc/api/interfaces/JsonObject
 */

import type { JsonValue } from '@flex-development/agecalc-api/types'

/**
 * A [JSON][] object.
 *
 * This type can be used to enforce input values to be JSON-compatible or as a
 * super-type to be extended from.
 *
 * [json]: https://restfulapi.net/json-data-types
 *
 * @see {@linkcode JsonValue}
 */
interface JsonObject {
  [key: string]: JsonValue
}

export type { JsonObject as default }

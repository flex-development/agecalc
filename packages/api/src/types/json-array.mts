/**
 * @file Type Aliases - JsonArray
 * @module agecalc/api/types/JsonArray
 */

import type { JsonValue } from '@flex-development/agecalc-api/types'

/**
 * An array containing [JSON values][json-data-types].
 *
 * [json-data-types]: https://restfulapi.net/json-data-types
 */
type JsonArray = JsonValue[] | readonly JsonValue[]

export type { JsonArray as default }

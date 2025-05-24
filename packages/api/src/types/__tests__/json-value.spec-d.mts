/**
 * @file Type Tests - JsonValue
 * @module agecalc/api/types/tests/unit-d/JsonValue
 */

import type TestSubject from '#types/json-value'
import type {
  JsonArray,
  JsonObject,
  JsonPrimitive
} from '@flex-development/agecalc-api/types'

describe('unit-d:types/JsonValue', () => {
  it('should extract JsonArray', () => {
    expectTypeOf<TestSubject>().extract<JsonArray>().not.toBeNever()
  })

  it('should extract JsonObject', () => {
    expectTypeOf<TestSubject>().extract<JsonObject>().not.toBeNever()
  })

  it('should extract JsonPrimitive', () => {
    expectTypeOf<TestSubject>().extract<JsonPrimitive>().not.toBeNever()
  })
})

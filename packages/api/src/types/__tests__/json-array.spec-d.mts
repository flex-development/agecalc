/**
 * @file Type Tests - JsonArray
 * @module agecalc/api/types/tests/unit-d/JsonArray
 */

import type TestSubject from '#types/json-array'
import type { JsonValue } from '@flex-development/agecalc-api/types'

describe('unit-d:types/JsonArray', () => {
  it('should allow readonly list', () => {
    // Arrange
    type Test = readonly TestSubject[number][] extends TestSubject ? 1 : 0

    // Expect
    expectTypeOf<Test>().toEqualTypeOf<1>()
  })

  describe('JsonArray[number]', () => {
    it('should extract JsonValue', () => {
      expectTypeOf<TestSubject[number]>().extract<JsonValue>().not.toBeNever()
    })
  })
})

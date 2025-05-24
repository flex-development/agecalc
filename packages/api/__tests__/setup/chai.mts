/**
 * @file Test Setup - chai
 * @module api/tests/setup/chai
 * @see https://chaijs.com
 */

import http from 'chai-http'
import { chai } from 'vitest'

chai.use(http)

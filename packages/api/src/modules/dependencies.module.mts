/**
 * @file Modules - DependenciesModule
 * @module agecalc/api/modules/DependenciesModule
 */

import ConfigModule from '#modules/config.module'
import { Global, Module } from '@nestjs/common'

/**
 * Global dependencies module.
 *
 * @class
 */
@Global()
@Module({ imports: [ConfigModule] })
class DependenciesModule {}

export default DependenciesModule

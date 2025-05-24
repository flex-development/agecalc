/**
 * @file Modules - AppModule
 * @module agecalc/api/modules/AppModule
 */

import DependenciesModule from '#modules/dependencies.module'
import { Module } from '@nestjs/common'

/**
 * Main application module.
 *
 * @class
 */
@Module({ imports: [DependenciesModule] })
class AppModule {}

export default AppModule

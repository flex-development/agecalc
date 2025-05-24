/**
 * @file app
 * @module agecalc/api/app
 */

import useSwagger from '#hooks/use-swagger.hook'
import AppModule from '#modules/app.module'
import { ConsoleLogger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  type NestFastifyApplication
} from '@nestjs/platform-fastify'

export default app

/**
 * Create a NestJS application.
 *
 * @see {@linkcode NestFastifyApplication}
 * @see https://fastify.dev
 *
 * @todo versioning
 *
 * @async
 *
 * @this {void}
 *
 * @return {Promise<NestFastifyApplication>}
 *  NestJS x Fastify application
 */
async function app(this: void): Promise<NestFastifyApplication> {
  /**
   * The NestJS application.
   *
   * @const {NestFastifyApplication} app
   */
  const app: NestFastifyApplication = await NestFactory.create(
    AppModule,
    new FastifyAdapter(),
    {
      abortOnError: false,
      logger: new ConsoleLogger({ logLevels: ['verbose'], prefix: 'nest' })
    }
  )

  // configure openapi documentation endpoints.
  useSwagger(app)

  return app
}

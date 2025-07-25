/**
 * @file Hooks - useSwagger
 * @module agecalc/api/hooks/useSwagger
 */

import routes from '#enums/routes'
import pkg from '@flex-development/agecalc-api/package.json'
import {
  alphabetize,
  ksort,
  lowercase,
  shake,
  values
} from '@flex-development/tutils'
import type { INestApplication } from '@nestjs/common'
import {
  DocumentBuilder,
  SwaggerModule,
  type OpenAPIObject
} from '@nestjs/swagger'

export default useSwagger

/**
 * Configure OpenAPI documentation endpoints.
 *
 * @see https://docs.nestjs.com/openapi/introduction
 *
 * @todo document contact info
 * @todo document license
 *
 * @this {void}
 *
 * @param {INestApplication} app
 *  The NestJS application
 * @return {undefined}
 */
function useSwagger(this: void, app: INestApplication): undefined {
  /**
   * Documentation builder.
   *
   * @const {DocumentBuilder} documentation
   */
  const docs: DocumentBuilder = new DocumentBuilder()

  docs.setVersion(pkg.version)
  docs.setTitle(pkg.openapi.title)
  docs.setDescription(pkg.openapi.description)

  return void SwaggerModule.setup(
    routes.APP,
    app,
    SwaggerModule.createDocument(app, docs.build(), {
      autoTagControllers: false,
      deepScanRoutes: true,
      extraModels: [],
      ignoreGlobalPrefix: true,
      operationIdFactory
    }),
    {
      jsonDocumentUrl: routes.APP,
      patchDocumentOnRequest,
      raw: ['json'],
      ui: false,
      useGlobalPrefix: false
    }
  )
}

/* v8 ignore start */

/**
 * Generate an `operationId` based on controller and method name.
 *
 * @see https://swagger.io/docs/specification/paths-and-operations
 *
 * @this {void}
 *
 * @param {string} controller
 *  Name of controller
 * @param {string} method
 *  Name of controller class method
 * @return {string}
 *  Operation id
 */
function operationIdFactory(
  this: void,
  controller: string,
  method: string
): string {
  return lowercase(controller.replace('Controller', '') + '-' + method)
}

/* v8 ignore stop */

/**
 * Modify the generated API `documentation` on request.
 *
 * @todo support versioning
 *
 * @this {void}
 *
 * @param {unknown} request
 *  The incoming request object
 * @param {unknown} response
 *  The server response object
 * @param {OpenAPIObject} documentation
 *  The generated API documentation
 * @return {OpenAPIObject}
 *  OpenAPI specification object
 */
function patchDocumentOnRequest(
  this: void,
  request: unknown,
  response: unknown,
  documentation: OpenAPIObject
): OpenAPIObject {
  const {
    components = {},
    externalDocs,
    info,
    openapi,
    paths,
    security,
    servers,
    tags
  } = documentation

  ksort(paths)

  if (components.schemas) ksort(components.schemas)
  if (tags) alphabetize(tags, tag => tag.name)

  /* v8 ignore start */

  for (const path of values(paths)) {
    for (const method of values(path)) {
      if (typeof method === 'object' && 'responses' in method) {
        for (const response of values(method.responses)) {
          if (typeof response === 'object' && 'description' in response) {
            // @ts-expect-error `description` should be optional (2790).
            // https://swagger.io/docs/specification/v3_0/describing-request-body/describing-request-body/
            if (!response.description) delete response.description
          }
        }
      }
    }
  }

  /* v8 ignore stop */

  return shake({
    openapi, // eslint-disable-next-line sort-keys
    info,
    servers, // eslint-disable-next-line sort-keys
    security,
    tags, // eslint-disable-next-line sort-keys
    externalDocs,
    paths, // eslint-disable-next-line sort-keys
    components
  })
}

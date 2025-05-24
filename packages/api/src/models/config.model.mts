/**
 * @file Models - Config
 * @module agecalc/api/models/Config
 */

import {
  IsIn,
  IsNotEmpty,
  IsString,
  validateSync as validate,
  type ValidationError
} from 'class-validator'

/**
 * Configuration environment.
 *
 * @class
 */
class Config {
  /**
   * The hostname or IP address where the application will listen for incoming
   * connections.
   *
   * @default '127.0.0.1'
   *
   * @public
   * @instance
   * @member {string} HOST
   */
  @IsString()
  @IsNotEmpty()
  public HOST!: string

  /**
   * Name for {@linkcode HOST}.
   *
   * @default 'localhost'
   *
   * @public
   * @instance
   * @member {string} HOSTNAME
   */
  @IsString()
  @IsNotEmpty()
  public HOSTNAME!: string

  /**
   * The type of environment the Node.js process is running in.
   *
   * @default 'development'
   *
   * @public
   * @instance
   * @member {string} NODE_ENV
   */
  @IsIn(['development', 'test', 'production'])
  public NODE_ENV!: string

  /**
   * The port number the application will listen for incoming connections on.
   *
   * @default 8080
   *
   * @public
   * @instance
   * @member {number} PORT
   */
  public PORT: number

  /**
   * The url the application will listen for incoming connections on.
   *
   * @public
   * @instance
   * @member {URL} URL
   */
  public URL: URL

  /**
   * Create a new configuration environment.
   *
   * @param {NodeJS.Dict<string | null | undefined>} env
   *  Environment variables object
   * @throws {AggregateError}
   */
  constructor(env: NodeJS.Dict<string | null | undefined>) {
    Object.assign(this, env)

    this.HOST = (this.HOST || '127.0.0.1').trim()
    this.HOSTNAME = (this.HOSTNAME || 'localhost').trim()
    this.NODE_ENV = (this.NODE_ENV || 'development').trim()

    /**
     * Validation errors.
     *
     * @const {ValidationError[]} errors
     */
    const errors: ValidationError[] = validate(this, {
      enableDebugMessages: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      stopAtFirstError: false,
      validationError: { target: false },
      whitelist: true
    })

    if (errors.length) {
      throw new AggregateError(errors, 'Invalid app configuration')
    }

    this.PORT = 8080
    this.URL = new URL('http://' + this.HOSTNAME)

    if (this.HOSTNAME === 'localhost') this.URL.port = this.PORT.toString()
  }
}

export default Config

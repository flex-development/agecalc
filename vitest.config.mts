/**
 * @file Configuration - Vitest
 * @module config/vitest
 * @see https://vitest.dev/config
 * @see https://vitest.dev/guide/projects.html
 */

import pathe from '@flex-development/pathe'
import ci from 'is-ci'
import swc from 'unplugin-swc'
import {
  defineConfig,
  type ConfigEnv,
  type ViteUserConfig
} from 'vitest/config'
import Notifier from './__tests__/reporters/notifier.mts'
import VerboseReporter from './__tests__/reporters/verbose.mts'
import api from './packages/api/package.json' with { type: 'json' }

export default defineConfig(config)

/**
 * Create a vitest configuration.
 *
 * @see {@linkcode ConfigEnv}
 * @see {@linkcode ViteUserConfig}
 *
 * @this {void}
 *
 * @param {ConfigEnv} env
 *  Configuration environment
 * @return {ViteUserConfig}
 *  Root vitest configuration object
 */
function config(this: void, env: ConfigEnv): ViteUserConfig {
  return {
    test: {
      allowOnly: !ci,
      chaiConfig: {
        includeStack: true,
        showDiff: true,
        truncateThreshold: 0
      },
      clearMocks: true,
      coverage: {
        all: true,
        clean: true,
        cleanOnRerun: true,
        exclude: [
          '**/*.d.mts',
          '**/__mocks__/',
          '**/__tests__/',
          '**/interfaces/',
          '**/types/',
          'packages/**/src/**/index.mts',
          'packages/api/src/main.mts',
          'packages/api/src/types.mts'
        ],
        extension: ['.mts'],
        include: ['packages/**/src'],
        provider: 'v8',
        reportOnFailure: !ci,
        reporter: env.mode === 'reports'
          ? ['text']
          : [ci ? 'lcovonly' : 'html', 'json-summary', 'text'],
        reportsDirectory: './coverage',
        skipFull: false,
        thresholds: { 100: true, perFile: true }
      },
      globalSetup: [],
      globals: true,
      include: [],
      mockReset: true,
      outputFile: {
        blob: `.vitest-reports/${env.mode}.blob.json`,
        json: pathe.join('__tests__/reports', env.mode + '.json')
      },
      passWithNoTests: true,
      reporters: JSON.parse(process.env['VITEST_UI'] ?? '0')
        ? [new Notifier(), new VerboseReporter()]
        : env.mode === 'reports'
        ? [new VerboseReporter()]
        : [
          ci ? 'github-actions' : new Notifier(),
          'blob',
          'json',
          new VerboseReporter()
        ],
      /**
       * Store snapshots next to the directory of `file`.
       *
       * @param {string} file
       *  Path to test file
       * @param {string} extension
       *  Snapshot extension
       * @return {string}
       *  Custom snapshot path
       */
      resolveSnapshotPath(file: string, extension: string): string {
        return pathe.resolve(
          pathe.resolve(pathe.dirname(pathe.dirname(file)), '__snapshots__'),
          pathe.basename(file).replace(/\.spec.mts/, '') + extension
        )
      },
      restoreMocks: true,
      setupFiles: [],
      snapshotFormat: {
        callToJSON: true,
        min: false,
        printBasicPrototype: false,
        printFunctionName: true
      },
      snapshotSerializers: [],
      unstubEnvs: true,
      unstubGlobals: true,
      workspace: [
        {
          extends: true,
          plugins: [
            swc.vite({ jsc: { transform: { decoratorMetadata: true } } })
          ],
          test: {
            environment: 'node',
            environmentOptions: {},
            globalSetup: [],
            include: ['packages/api/src/**/__tests__/*.spec.mts'],
            name: api.name,
            setupFiles: ['./packages/api/__tests__/setup/chai.mts'],
            snapshotSerializers: [
              './packages/api/__tests__/serializers/openapi.mts'
            ],
            typecheck: {
              allowJs: false,
              checker: 'tsc',
              enabled: env.mode === 'typecheck',
              ignoreSourceErrors: false,
              include: ['packages/api/src/**/__tests__/*.spec-d.mts'],
              only: true,
              tsconfig: './packages/api/tsconfig.typecheck.json'
            }
          }
        }
      ]
    }
  }
}

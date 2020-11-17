import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import babel from '@rollup/plugin-babel'
import alias from '@rollup/plugin-alias'
import yaml from '@rollup/plugin-yaml'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess'
import config from 'sapper/config/rollup.js'
import pkg from './package.json'
import { mdsvex } from 'mdsvex'
import image from 'svelte-image'
import svelteSVG from 'rollup-plugin-svelte-svg'

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const dotenv = require('dotenv').config().parsed

const onwarn = (warning, onwarn) =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
  warning.code === 'THIS_IS_UNDEFINED' ||
  onwarn(warning)

const aliasPath = {
  entries: [{ find: '~', replacement: 'src' }]
}

const extensions = ['.svelte', '.svx']

const svelteImageOptions = {
  placeholder: 'blur'
}

const svelteOptions = {
  dev,
  extensions,
  hydratable: true,
  preprocess: [
    sveltePreprocess({
      postcss: true,
      defaults: {
        style: 'postcss'
      }
    }),
    mdsvex(),
    image(svelteImageOptions)
  ]
}

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        ENV: JSON.stringify(dotenv)
      }),
      svelte({
        emitCss: true,
        ...svelteOptions
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
      alias(aliasPath),
      yaml(),
      svelteSVG({ dev }),

      legacy &&
        babel({
          extensions: ['.js', '.mjs', '.html', ...extensions],
          babelHelpers: 'runtime',
          exclude: ['node_modules/@babel/**'],
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead'
              }
            ]
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            [
              '@babel/plugin-transform-runtime',
              {
                useESModules: true
              }
            ]
          ]
        }),

      !dev &&
        terser({
          module: true
        })
    ],

    preserveEntrySignatures: false,
    onwarn
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
        ENV: JSON.stringify(dotenv)
      }),
      svelte({
        generate: 'ssr',
        ...svelteOptions
      }),
      resolve({
        dedupe: ['svelte']
      }),
      commonjs(),
      alias(aliasPath),
      yaml(),
      svelteSVG({ generate: 'ssr', dev })
    ],
    external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),

    preserveEntrySignatures: 'strict',
    onwarn
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      commonjs(),
      !dev && terser()
    ],

    preserveEntrySignatures: false,
    onwarn
  }
}

import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import yaml from '@rollup/plugin-yaml';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';


const babelconfig = {
	extensions: ['.js', '.mjs', '.html', '.svelte'],
	runtimeHelpers: true,
	exclude: ['node_modules/@babel/**'],
	presets: [
		['@babel/preset-env', {
			targets: '> 0.25%, not dead'
		}]
	],
	plugins: [
		'@babel/plugin-syntax-dynamic-import',
		['@babel/plugin-transform-runtime', {
			useESModules: true
		}]
	]
}

// Preprocessing
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import autoPreprocess from 'svelte-preprocess';
const preprocessOptions = {
	postcss: {
    plugins: [
      postcssImport,
      postcssPresetEnv({
        stage: 0,
        browsers: 'last 2 versions',
        autoprefixer: { grid: true }
      })
    ]
  }
};

import { mdsvex } from "mdsvex";
const preprocess = [
	autoPreprocess(preprocessOptions),
	mdsvex({
		layout: {
			blog: "./src/components/layout/BlogLayout.svelte",
			none: "./src/components/layout/SimpleLayout.svelte",
			_: "./src/components/layout/BlogLayout.svelte",
		}
	})
];


const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;
if (dev) require('dotenv').config();

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY') || onwarn(warning);
const dedupe = importee => importee === 'svelte' || importee.startsWith('svelte/');


export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		preserveEntrySignatures: false,
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			alias({
				resolve: ['.js', '.svelte'],
				entries: { '@': __dirname + '/src' }
			}),
			json(),
			yaml(),
			svelte({
				extensions: ['.svelte', '.svx'],
				preprocess,
				dev,
				hydratable: true,
				emitCss: true
			}),
			resolve({
				browser: true,
				dedupe
			}),
			commonjs(),
			legacy && babel(babelConfig),
			!dev && terser({ module: true })
		],

		onwarn,
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		preserveEntrySignatures: false,
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			alias({
				resolve: ['.js', '.svelte'],
				entries: { '@': __dirname + '/src' }
			}),
			json(),
			yaml(),
			svelte({
				extensions: ['.svelte', '.svx'],
				preprocess,
				generate: 'ssr',
				dev
			}),
			resolve({
				dedupe
			}),
			commonjs()
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),

		onwarn,
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
			legacy && babel(babelConfig),
			!dev && terser()
		],

		onwarn,
	}
};

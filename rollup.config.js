import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

const entries = {
  index: 'src/ts/index.ts'
};

const createReplaceConfig = () => ({
  include: Object.values(entries),
  preventAssignment: true,
  values: {
    __VERSION__: pkg.version
  }
});

const external = [];

const esbuildConfig = process.env.BUILD === 'development' ? {
  sourceMap: true,
  minifyWhitespace: true
} : {
  sourceMap: false,
  minify: true,
  target: 'es6',
  treeShaking: true,
  drop: ['debugger']
};

export default Object.entries(entries)
  .reduce((acc, cur) => acc.concat([
    {
      input: cur[1],
      external,
      plugins: [
        del({ targets: 'dist/*' }),
        nodeResolve(),
        commonjs(),
        replace(createReplaceConfig()),
        esbuild(esbuildConfig),
        postcss()
      ],
      output: [
        {
          file: `dist/cjs/${cur[0]}.js`,
          format: 'cjs',
          sourcemap: true,
          plugins: [generatePackageJson({ baseContents: { type: 'commonjs' } })]
        },
        {
          file: `dist/esm/${cur[0]}.js`,
          format: 'es',
          sourcemap: true,
          plugins: [generatePackageJson({ baseContents: { type: 'module' } })]
        }
      ]
    },
    {
      input: cur[1],
      external,
      plugins: [
        nodeResolve(),
        commonjs(),
        replace(createReplaceConfig()),
        postcss(),
        dts()
      ],
      output: [
        {
          file: `dist/esm/${cur[0]}.d.ts`,
          format: 'es'
        }
      ]
    }
  ]), []);
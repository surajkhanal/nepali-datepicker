import fs from 'fs';
import path from 'path';

function copyMaterialCss() {
  return {
    name: 'copy-material-css',
    buildStart() {
      const distDir = path.resolve('dist');
      fs.mkdirSync(distDir, { recursive: true });
      fs.copyFileSync(path.resolve('src/styles/material.css'), path.join(distDir, 'material.css'));
    },
  };
}

export default [
  {
    input: 'src/index.js',
    output: [
      { file: 'dist/nepali-datepicker.esm.js', format: 'esm' },
      { file: 'dist/nepali-datepicker.cjs.js', format: 'cjs', exports: 'named' },
      { file: 'dist/nepali-datepicker.umd.js', format: 'umd', name: 'NepaliDatePicker', exports: 'named' },
    ],
    plugins: [copyMaterialCss()],
  },
  {
    input: 'src/adapters/react.js',
    output: { file: 'dist/adapters/react.esm.js', format: 'esm' },
  },
  {
    input: 'src/adapters/vue.js',
    output: { file: 'dist/adapters/vue.esm.js', format: 'esm' },
  },
  {
    input: 'src/adapters/svelte.js',
    output: { file: 'dist/adapters/svelte.esm.js', format: 'esm' },
  },
];

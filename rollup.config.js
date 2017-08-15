import sourcemaps from 'rollup-plugin-sourcemaps';
export default {
  entry: "./build/main.js",
  dest: "./build/main.compiled.js",
  sourceMap: "inline",
  format: "iife",
  plugins: [
    sourcemaps()
  ]
};
import clear from 'rollup-plugin-clear';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const path = '/Users/emin/AppData/Local/Screeps/scripts/screeps_cogd_io___21025/default';

module.exports = {
  input: 'src/main.ts',
  output: {
    file: `${path}/main.js`,
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [clear({ targets: [path] }), resolve(), commonjs(), typescript()],
};

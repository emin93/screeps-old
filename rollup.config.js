import clear from 'rollup-plugin-clear';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const path = '/Users/emin/AppData/Local/Screeps/scripts/server1_screepspl_us___21025/default';
//const path = '/Users/emin/AppData/Local/Screeps/scripts/screeps.com/default';

module.exports = {
  input: 'src/main.ts',
  output: {
    file: `${path}/main.js`,
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [clear({ targets: [path] }), resolve(), commonjs(), typescript()],
};

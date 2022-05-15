const path = require('path');

const OUTPUT_PATH = '../../dist/nest';
const OUTPUT_FILE_NAME = 'main.js';

module.exports = (options) => {
  if (!options.output) {
    options.output = {};
  }
  options.output.path = path.resolve(__dirname, OUTPUT_PATH);
  options.output.filename = OUTPUT_FILE_NAME;
  console.debug(options);
  if (
    (process.argv.includes('b') || process.argv.includes('build')) &&
    (process.argv.includes('--watch') || process.argv.includes('-w'))
  ) {
    const spawn = require('child_process').spawn;
    const filePath = path.resolve(__dirname, OUTPUT_PATH, OUTPUT_FILE_NAME);
    if (!options.plugins) {
      options.plugins = [];
    }
    options.watchOptions = {
      ignored: [
        'dist',
        'src/angular',
        'node_modules',
        'test/angular',
        'tsconfig/angular',
      ],
    };
    let child;
    options.plugins.push({
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          if (child) {
            if (!child.kill()) {
              child.kill(9);
            }
          }
          child = spawn('node', [filePath]);
          child.stdout.on('data', function (data) {
            process.stdout.write(data);
          });
          child.stderr.on('data', function (data) {
            process.stderr.write(data);
          });
        });
      },
    });
  }
  return options;
};

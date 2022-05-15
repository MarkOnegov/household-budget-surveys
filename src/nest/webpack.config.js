const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const OUTPUT_PATH = '../../dist/nest';
const OUTPUT_FILE_NAME = 'main.js';

module.exports = (options) => {
  if (!options.output) {
    options.output = {};
  }
  options.output.path = path.resolve(__dirname, OUTPUT_PATH);
  options.output.filename = OUTPUT_FILE_NAME;
  console.debug(options);
  options.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{ from: '**/*.yaml', to: '[name][ext]', toType: 'template' }],
    }),
  );
  options.plugins.push(
    new webpack.WatchIgnorePlugin({
      paths: [/\/dist\//, /\/angular\//, /\/node_modules\//, /\/.[^/]+/],
    }),
  );
  if (
    (process.argv.includes('b') || process.argv.includes('build')) &&
    (process.argv.includes('--watch') || process.argv.includes('-w'))
  ) {
    const spawn = require('child_process').spawn;
    const filePath = path.resolve(__dirname, OUTPUT_PATH, OUTPUT_FILE_NAME);
    if (!options.plugins) {
      options.plugins = [];
    }
    if (!options.stats) {
      options.stats = {};
    }
    options.stats.logging = 'verbose';
    let child;
    let hash;
    options.plugins.push({
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          const newHash = compilation.getStats().hash;
          if (newHash !== hash) {
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
          }
          hash = newHash;
        });
      },
    });
  }
  return options;
};

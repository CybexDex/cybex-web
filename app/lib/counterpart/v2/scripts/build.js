const readFileSync = require('fs').readFileSync;
const execSync = require('child_process').execSync;
const inInstall = require('in-publish').inInstall;
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

if (inInstall()) {
  process.exit(0)
}

const exec = (command, env) => execSync(command, {
  stdio: 'inherit', env
});

const webpackEnv = Object.assign({}, process.env, {
  NODE_ENV: 'production'
});

exec('yarn run build-cjs');
exec('yarn run build-umd', webpackEnv);
exec('yarn run build-min', webpackEnv);

console.log(
  '\ngzipped, the UMD build is ' + prettyBytes(
    gzipSize.sync(readFileSync('umd/counterpart.min.js'))
  )
);

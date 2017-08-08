// Generated on 2017-08-08 using generator-angular-fullstack 4.1.4
'use strict';

import _ from 'lodash';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import http from 'http';
import lazypipe from 'lazypipe';
import nodemon from 'nodemon';
import runSequence from 'run-sequence';

var plugins = gulpLoadPlugins();
var config;

const serverPath = 'core';
const paths = {
  server: {
    scripts: [
      `${serverPath}/**/!(*.spec|*.integration).js`,
      `!${serverPath}/config/local.env.sample.js`
    ],
    json: [`${serverPath}/**/*.json`]
  },
  dist: 'dist'
};

/********************
 * Helper functions
 ********************/

function onServerLog(log) {
  console.log(plugins.util.colors.white('[') +
    plugins.util.colors.yellow('nodemon') +
    plugins.util.colors.white('] ') +
    log.message);
}

function checkAppReady(cb) {
  var options = {
    host: 'localhost',
    port: config.port
  };
  http
    .get(options, () => cb(true))
    .on('error', () => cb(false));
}

// Call page until first success
function whenServerReady(cb) {
  var serverReady = false;
  var appReadyInterval = setInterval(() =>
      checkAppReady((ready) => {
        if (!ready || serverReady) {
          return;
        }
        clearInterval(appReadyInterval);
        serverReady = true;
        cb();
      }),
    100);
}

/********************
 * Reusable pipelines
 ********************/

let lintServerScripts = lazypipe()
  .pipe(plugins.eslint, `${serverPath}/.eslintrc`)
  .pipe(plugins.eslint.format);

let lintServerTestScripts = lazypipe()
  .pipe(plugins.eslint, {
    configFile: `${serverPath}/.eslintrc`,
    envs: [
      'node',
      'es6',
      'mocha'
    ]
  })
  .pipe(plugins.eslint.format);

let transpileServer = lazypipe()
  .pipe(plugins.sourcemaps.init)
  .pipe(plugins.babel, {
    plugins: [
      'transform-class-properties',
      'transform-runtime'
    ]
  })
  .pipe(plugins.sourcemaps.write, '.');

/********************
 * Env
 ********************/

gulp.task('env:all', () => {
  let localConfig;
  try {
    localConfig = require(`./${serverPath}/config/local.env`);
  } catch (e) {
    localConfig = {};
  }
  plugins.env({
    vars: localConfig
  });
});

gulp.task('env:test', () => {
  plugins.env({
    vars: {NODE_ENV: 'test'}
  });
});
gulp.task('env:prod', () => {
  plugins.env({
    vars: {NODE_ENV: 'production'}
  });
});

/********************
 * Tasks
 ********************/

gulp.task('transpile:server', () => {
  return gulp.src(_.union(paths.server.scripts, paths.server.json))
    .pipe(transpileServer())
    .pipe(gulp.dest(`${paths.dist}/${serverPath}`));
});

// gulp.task('lint:scripts', cb => runSequence(['lint:scripts:client', 'lint:scripts:server'], cb));
gulp.task('lint:scripts', cb => runSequence(['lint:scripts:server'], cb));

gulp.task('lint:scripts:server', () => {
  return gulp.src(_.union(paths.server.scripts, _.map(paths.server.test, blob => '!' + blob)))
    .pipe(lintServerScripts());
});

gulp.task('jscs', () => {
  return gulp.src(_.union(paths.client.scripts, paths.server.scripts))
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter());
});


gulp.task('start:server', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  config = require(`./${serverPath}/config/environment`);
  nodemon(`-w ${serverPath} ${serverPath}`)
    .on('log', onServerLog);
});

gulp.task('start:server:prod', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';
  config = require(`./${paths.dist}/${serverPath}/config/environment`);
  nodemon(`-w ${paths.dist}/${serverPath} ${paths.dist}/${serverPath}`)
    .on('log', onServerLog);
});

gulp.task('start:inspector', () => {
  gulp.src([])
    .pipe(plugins.nodeInspector({
      debugPort: 5858
    }));
});

gulp.task('start:server:debug', () => {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  config = require(`./${serverPath}/config/environment`);
  nodemon(`-w ${serverPath} --debug=5858 --debug-brk ${serverPath}`)
    .on('log', onServerLog);
});

gulp.task('watch', () => {
  var testFiles = _.union(paths.client.test, paths.server.test.unit, paths.server.test.integration);

  plugins.watch(_.union(paths.server.scripts, testFiles))
    .pipe(plugins.plumber())
    .pipe(lintServerScripts());

  plugins.watch(_.union(paths.server.test.unit, paths.server.test.integration))
    .pipe(plugins.plumber())
    .pipe(lintServerTestScripts());
});

gulp.task('watch-server', () => {
  plugins.watch(paths.server.scripts)
    .pipe(plugins.plumber())
    .pipe(lintServerScripts());
});

gulp.task('serve', cb => {
  runSequence(
    [
      // 'clean:tmp',
      'lint:scripts',
      // 'inject',
      // 'copy:fonts:dev',
      'env:all'
    ],
    // 'webpack:dev',
    ['start:server'],
    'watch-server',
    cb
  );
});

gulp.task('serve:debug', cb => {
  runSequence(
    [
      'clean:tmp',
      'lint:scripts',
      'inject',
      'copy:fonts:dev',
      'env:all'
    ],
    'webpack:dev',
    'start:inspector',
    ['start:server:debug', 'start:client'],
    'watch',
    cb
  );
});

gulp.task('serve:dist', cb => {
  runSequence(
    'build',
    'env:all',
    'env:prod',
    ['start:server:prod', 'start:client'],
    cb);
});

/********************
 * Build
 ********************/

gulp.task('build', cb => {
  runSequence(
    'transpile:server',
    [
      'copy:server'
    ],
    cb);
});

gulp.task('copy:extras', () => {
  return gulp.src([
    `${clientPath}/favicon.ico`,
    `${clientPath}/robots.txt`,
    `${clientPath}/.htaccess`
  ], {dot: true})
    .pipe(gulp.dest(`${paths.dist}/${clientPath}`));
});


gulp.task('copy:server', () => {
  return gulp.src([
    'package.json'
  ], {cwdbase: true})
    .pipe(gulp.dest(paths.dist));
});


import del from 'del'
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import yargs from  'yargs'
import fs from 'fs'
import yaml from 'js-yaml'
import rollup from 'gulp-rollup'
import uglify from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'

const $ = gulpLoadPlugins()

// Load settings from settings.yml
const { paths, rollupConfig } = loadConfig()

function loadConfig() {
  const ymlFile = fs.readFileSync('config.yml', 'utf8')
  return yaml.load(ymlFile)
}

// Lint JS files
gulp.task('lint', () => {
  return gulp.src(paths.src.js)
    .pipe($.cached('js')) // Process only changed files
    .pipe($.eslint())
    .pipe($.eslint.format())
})

// Bump Version
gulp.task('version', () => {
  let options = {
    type: 'patch'
  }

  if (yargs.argv.minor) {
    options.type = 'minor'
  } else if (yargs.argv.major) {
    options.type = 'major'
  } else if (yargs.argv.version) {
    options = {
      version: yargs.argv.version
    }
  }

  return gulp.src('./package.json')
  .pipe($.bump(options))
  .pipe(gulp.dest('./'))
})

gulp.task('clean', del.bind(null, [paths.dist]))

gulp.task('bundle', () => {
  return gulp.src(paths.src.js)
    .pipe(rollup({
      entry: rollupConfig.entries,
      format: 'cjs',
      external: rollupConfig.external,
      plugins: [
        babel({
          presets: [
            [
              'es2015', {
                'modules': false
              }
            ]
          ],
          plugins: [
            'external-helpers'
          ],
          runtimeHelpers: true,
          babelrc: false,
          exclude: 'node_modules/**'
        }),
        uglify()
      ]
    }))
    .pipe(gulp.dest(paths.dist))
})

gulp.task('copy', () => {
  return gulp.src(paths.src.assets)
    .pipe(gulp.dest(paths.dist))
})

gulp.task('test', function() {
  const mocha = require('gulp-mocha')

  return gulp.src(['test/*.js'])
    .pipe(mocha({
      compilers: 'js:babel-core/register'
    }
  ))
})

gulp.task('build', gulp.series('lint', 'clean',  'bundle', 'copy'))


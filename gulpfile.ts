import * as gulp from "gulp";
import * as karma from "karma";
import * as fs from 'fs';
import * as path from 'path'

//import * as gulp from 'gulp'

/**
 * @type {gulp}
 */
var //gulp        = require("gulp"),
    pump         = require('pump'),
    browserify   = require("browserify"),
    source       = require("vinyl-source-stream"),
    buffer       = require("vinyl-buffer"),
    tslint       = require("gulp-tslint"),
    tsc          = require("gulp-typescript"),
    sourcemaps   = require("gulp-sourcemaps"),
    uglify       = require("gulp-uglify"),
    rollup       = require('gulp-rollup'),
    rename       = require("gulp-rename"),
    runSequence  = require("run-sequence"),
    mocha        = require("gulp-mocha"),
    istanbul     = require("gulp-istanbul"),
    jasmine      = require("gulp-jasmine"),
    clean        = require('gulp-clean'),
    SpecReporter = require('jasmine-spec-reporter'),
    _            = require('lodash')
    ;

let c = {
    src          : [ 'src/**/*.ts' ],
    fileName     : 'radic.console-colors',
    moduleName   : '@radic/console-colors',
    umdModuleName: 'console.colors'
}

gulp.task('clean', [ 'clean:src', 'clean:build' ])
gulp.task('clean:build', () => gulp.src([ 'dist', 'dts', 'es', 'lib', 'umd', 'coverage' ]).pipe(clean()))
gulp.task('clean:src', () => gulp.src([ '{src,spec}/*.{js,js.map}', '*.{js,js.map}' ]).pipe(clean()))

//******************************************************************************
//* BUILD
//******************************************************************************
var tsLibProject = tsc.createProject("tsconfig.json", { module: "es2015", declaration: true, typescript: require("typescript") });

gulp.task("build-lib", function () {
    return gulp.src([
        "src/**/*.ts",
        "!src/**/*.spec.ts"
    ])
        .pipe(tsLibProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .pipe(gulp.dest("lib/"))
});


gulp.task('build-umd', [ 'build-lib' ], (cb) => {
    pump([
        gulp.src('lib/**/*.js'),
        rollup({
            entry     : './lib/index.js',
            format    : 'umd',
            moduleName: c.umdModuleName,
            globals   : { lodash: '_' }
        }),
        gulp.dest('./'),
        clean(),
        rename(c.fileName + '.js'),
        gulp.dest('./')
    ], cb)
});

gulp.task('build-umd:minify', ['build-umd'], (cb) => {
    pump([
        gulp.src('./' + c.fileName + '.js'),
        uglify(),
        rename(c.fileName + '.min.js'),
        gulp.dest('./')
    ], cb)
})

//******************************************************************************
//* TESTS NODE
//******************************************************************************
var tstProject = tsc.createProject("tsconfig.json", { typescript: require("typescript") });

gulp.task("build-src", function () {
    return gulp.src([
        "src/**/*.ts"
    ])
        .pipe(tstProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js.pipe(gulp.dest("src/"));
});

var tsTestProject = tsc.createProject("tsconfig.json", { typescript: require("typescript") });

gulp.task("build-test", function () {
    return gulp.src([
        "spec/**/*.ts"
    ])
        .pipe(tsTestProject())
        .on("error", function (err) {
            process.exit(1);
        })
        .js.pipe(gulp.dest("spec/"));
});

gulp.task("jasmine", function () {
    return gulp.src([
        "src/**/*.spec.js"
    ])
        .pipe(jasmine({
            reporter: new SpecReporter(),
            config  : require('./jasmine.json')
        }))
});
//
// gulp.task("istanbul:hook", function () {
//     return gulp.src(["src/**/*.js"])
//         .pipe(istanbul())
//         .pipe(sourcemaps.write("."))
//         .pipe(istanbul.hookRequire());
// });

//******************************************************************************
//* TESTS BROWSER
//******************************************************************************
gulp.task("bundle-test", function () {

    var mainJsFilePath = "test/inversify.test.js";
    var outputFolder   = "temp/";
    var outputFileName = "bundle.test.js";

    var bundler = browserify({
        debug     : true,
        standalone: "inversify"
    });

    return bundler.add(mainJsFilePath)
        .bundle()
        .pipe(source(outputFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(outputFolder));
});

gulp.task("karma", [ "bundle-test" ], function (done) {
    new karma.Server({
        configFile: __dirname + "/karma.conf.js"
    }, function (code) {
        if ( code === 1 ) {
            console.log('Browser test failures, exiting process');
            done('Browser test Failures');
        } else {
            console.log('Browser tests passed');
            done();
        }
    }).start();
});

// Run browser testings on AppVeyor not in Travis CI

gulp.task("test", function (cb) {
    if ( process.env.APPVEYOR ) {
        runSequence("jasmine", "karma", cb);
    } else {
        runSequence("jasmine", cb);
    }
});


//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("build", (cb) => {
    runSequence(
        "clean",
        [ "build-src", "build-lib", 'build-umd', 'build-umd:minify' ],   // tests + build es and lib
        "build-test", cb);
});

gulp.task("default", (cb) => {
    runSequence(
        "build",
        "test",
        cb);
});

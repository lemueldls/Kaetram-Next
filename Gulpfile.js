/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-nocheck

const path = require('path');
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
// const typedoc = require('gulp-typedoc');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
// const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
// const connect = require('gulp-connect');
const buffer = require('vinyl-buffer');
const jsonminify = require('gulp-jsonminify');
// const browserify = require('browserify');
// const tsify = require('tsify');
const del = require('del');
// const source = require('vinyl-source-stream');
const workbox = require('workbox-build');

gulp.task('clean', async () => del(['dist', 'client-dist']));

/**
 * Server
 */

gulp.task('copy-server', async () =>
    gulp
        .src(['server/data/**/*.json'], { base: 'server' })
        .pipe(plumber())
        .pipe(jsonminify())
        .pipe(gulp.dest('dist'))
);

gulp.task('build-server', async () => {
    const tsProject = ts.createProject('server/tsconfig.json');
    return tsProject
        .src()
        .pipe(plumber())
        .pipe(tsProject())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

/**
 * Client
 */

gulp.task('copy-client', async () =>
    gulp
        .src(
            [
                'client/audio/**/*',
                'client/css/**/*',
                'client/data/**/*',
                'client/fonts/**/*',
                'client/img/**/*',
                'client/lib/**',
                'client/browserconfig.xml',
                'client/favicon.ico',
                'client/index.html',
                'client/manifest.json',
            ],
            {
                base: 'client',
            }
        )
        .pipe(plumber())
        .pipe(gulp.dest('client-dist'))
);

gulp.task('build-client', async () => {
    const tsProject = ts.createProject('client/tsconfig.json');
    return tsProject
        .src()
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(babel())
        .pipe(buffer())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('client-dist'));
});

gulp.task('generate-sw', async () => {
    const build = await workbox.injectManifest({
        swSrc: path.resolve(__dirname, './client/sw.js'),
        swDest: path.resolve(__dirname, './client-dist/sw.js'),
        globDirectory: path.resolve(__dirname, './client-dist/'),
        globPatterns: [
            '**/*.{mp3,css,json,js,ico,eot,svg,ttf,woff,png,gif,jpg,html,txt,xml}',
        ],
        maximumFileSizeToCacheInBytes: 5e6,
    });
    const { count, size, warnings } = build;

    warnings.forEach(console.warn);
    console.log(`${count} files will be precached, totaling ${size} bytes.`);

    return build;
});

// gulp.task('typedoc', () =>
//     gulp
//         .src(['./client/ts/main.ts', './server/**/*.ts', './tools/**/*.ts'])
//         .pipe(
//             typedoc({
//                 typeRoots: ['./client/typings'],
//                 esModuleInterop: true,
//                 resolveJsonModule: true,
//                 mode: 'modules',
//                 out: './docs',
//                 theme: 'default',
//                 name: 'Kaetram',
//                 hideGenerator: true
//             })
//         )
// );

gulp.task('client', gulp.series('build-client', 'copy-client'));
gulp.task('server', gulp.series('build-server', 'copy-server'));

gulp.task('post-build', gulp.series('generate-sw'));

gulp.task(
    'default',
    gulp.series(
        'clean',
        gulp.parallel('build-server', 'build-client'),
        gulp.parallel('copy-server', 'copy-client')
    )
);

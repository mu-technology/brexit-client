const gulp = require('gulp');
const workflow = require('gulp-workflow');

workflow
    .load(gulp)
    .task('clean', 'Clean any build folders', ['clean:dist', 'clean:release'])
    .task('lint', 'Run all linters.', ['tslint'])
    .task('develop', 'Develop the application', [
        'clean',
        'lint',
        'build:css',
        'build:assets',
        'build:index:dev'
    ])
    .task('release', 'Release the application', [
        'clean',
        'lint',
        'build:css',
        'build:assets',
        'build:js:release',
        'build:index:release',
        'package'
    ]);
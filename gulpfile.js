const gulp = require('gulp');
const workflow = require('gulp-workflow');

workflow
    .load(gulp)
    .task('lint', 'Run all linters.', ['tslint'])
    .task('build', 'Build the application', ['clean', 'build:js', 'build:index'], {
        release: 'build for release'
    })
    .task('develop', 'watch for changes', ['watch']);
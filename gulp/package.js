module.exports = (workflow, gulp) => {

    workflow.subtask('package', () => {

        return gulp.src(['./dist/index.html', './dist/**/*.js', '!./dist/src/**/*.*'])
            .pipe(gulp.dest('./release'));
    });
};
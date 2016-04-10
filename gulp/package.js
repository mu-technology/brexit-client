module.exports = (workflow, gulp) => {

    workflow.subtask('package', () => {

        return gulp.src([
                './dist/index.html',
                './dist/**/*.*',
                '!./dist/brexit/**/*.*'
            ])
            .pipe(gulp.dest('./release'));
    });
};
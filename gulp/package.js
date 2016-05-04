module.exports = (workflow, gulp) => {

    workflow.subtask('package', () => {

        return gulp.src([
                './dist/index.html',
                './dist/**/*.*',
                '!./dist/brexit/**/*.*',
                '!./dist/shared/**/*.*'
            ])
            .pipe(gulp.dest('./release'));
    });
};
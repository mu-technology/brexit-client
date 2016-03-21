module.exports = (workflow, gulp) => {

    workflow.subtask('build:assets', function () {
        gulp.src('./assets/**/*.*')
            .pipe(gulp.dest('./dist/assets/'));
    });
};
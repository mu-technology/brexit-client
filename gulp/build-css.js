module.exports = (workflow, gulp, $) => {

    workflow.subtask('build:css', () => {

        return gulp.src('src/brexit/app.styl')
            .pipe($.sourcemaps.init())
            .pipe($.stylus())
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest('./dist'));
    });
};
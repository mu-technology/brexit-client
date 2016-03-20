module.exports = (workflow, gulp, $) => {

    workflow.subtask('tslint', () => {
        gulp.src('src/**/*.ts')
            .pipe($.tslint())
            .pipe($.tslint.report('verbose'));
    });
};
module.exports = (workflow, gulp) => {

    workflow.subtask('watch', function() {
        gulp.watch('src/**/*.ts', ['tslint', 'build:js']);
        gulp.watch('src/index.html', ['build:index']);
    });
};
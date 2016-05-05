module.exports = (workflow, gulp) => {

    workflow.subtask('watch', function() {
        gulp.watch('src/**/*.ts', ['tslint', 'compile:js']);
        gulp.watch('src/index.html', ['build:index:dev']);
    });
};
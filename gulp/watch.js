module.exports = (workflow, gulp) => {

    workflow.subtask('watch', function() {
        gulp.watch('src/**/*.ts', ['tslint']);
        gulp.watch('src/**/*.styl', ['build:css']);
        gulp.watch('src/index.html', ['build:index:dev']);
    });
};
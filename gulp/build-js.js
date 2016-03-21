module.exports = (workflow, gulp, $) => {

    const tsProject = $.typescript.createProject('tsconfig.json');
    workflow.subtask('compile:js', () => {
        const tsResult = tsProject.src('src/**/*.ts').pipe($.typescript(tsProject));

        return tsResult.js.pipe(gulp.dest('./dist'));
    });

    workflow.subtask('build:js:release', ['compile:js'], () => {
        return gulp.src('./dist/src/main.js')
            .pipe($.jspm({ selfExecutingBundle: true }))
            .pipe(gulp.dest('./dist/'));
    });
};
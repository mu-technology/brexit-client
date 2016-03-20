module.exports = (workflow, gulp, $, config) => {

    const tsProject = $.typescript.createProject('tsconfig.json');
    workflow.subtask('compile:js', () => {
        const tsResult = tsProject.src('src/**/*.ts').pipe($.typescript(tsProject));

        return tsResult.js.pipe(gulp.dest('./dist'));
    });

    const dependencies = config.args.release ? ['compile:js'] : [];
    workflow.subtask('build:js', dependencies, () => {
        if (config.args.release) {
            return gulp.src('./dist/src/main.js')
                .pipe($.jspm({ selfExecutingBundle: true }))
                .pipe(gulp.dest('./dist/'));
        }
    });
};
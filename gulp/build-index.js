module.exports = (workflow, gulp, $, config) => {

    const vendors = config.args.release ? ['node_modules/angular2/bundles/angular2-polyfills.min.js'] : config.vendors;
    const dependencies = config.args.release ? ['bundle:vendors'] : [];

    workflow.subtask('build:index', dependencies, () => {
        const target = gulp.src('src/index.html');
        const appSources = (config.args.release) ? gulp.src(['dist/main.bundle.js']) : gulp.src([]);
        const vendorSources = (config.args.release) ? gulp.src(['dist/vendors/*.js']) : gulp.src(config.vendors);

        target
            .pipe($.inject(vendorSources, { name: 'vendor' }))
            .pipe($.if(config.args.release,
                $.inject(appSources, { name: 'app' }),
                $.inject(gulp.src(['config.js'], { read: false }), {
                    name: 'app',
                    transform: () => `<script>System.import('app').then(null, console.error.bind(console));</script>`
                }))
            )
            .pipe($.if(config.args.release, gulp.dest('./dist/'), gulp.dest('')));
    });

    workflow.subtask('bundle:vendors', () => {
        return gulp.src(vendors)
            .pipe(gulp.dest('./dist/vendors/'));
    });
};
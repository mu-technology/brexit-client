module.exports = (workflow, gulp, $, config) => {

    workflow.subtask('build:index:dev', () => {
        const vendors = config.vendors.map(v => v.path);
        const target = gulp.src('src/index.html');
        const vendorSources = gulp.src(vendors);

        return target
            .pipe($.inject(vendorSources, { name: 'vendor' }))
            .pipe($.inject(gulp.src(['config.js'], { read: false }), {
                name: 'app',
                transform: () => `<script>System.import('app').then(null, console.error.bind(console));</script>`
            }))
            .pipe(gulp.dest(''));
    });

    workflow.subtask('build:index:release', ['build:vendors'], () => {
        const target = gulp.src('src/index.html');
        const appSources = gulp.src(['dist/main.bundle.js']);
        const vendorSources = gulp.src(['dist/vendors/*.js']);

        return target
            .pipe($.inject(vendorSources, { name: 'vendor', ignorePath: '/dist' }))
            .pipe($.inject(appSources, { name: 'app', ignorePath: '/dist' }))
            .pipe(gulp.dest('./dist/'));
    });

    workflow.subtask('build:vendors', () => {
        const vendors = config.vendors.filter(v => v.release).map(v => v.path);

        return gulp.src(vendors)
            .pipe(gulp.dest('./dist/vendors/'));
    });
};
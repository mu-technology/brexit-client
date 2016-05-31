module.exports = {
    vendors: [
        {
            path: 'node_modules/es6-shim/es6-shim.min.js',
            release: true
        },
        {
            path: 'node_modules/angular2/bundles/angular2-polyfills.min.js',
            release: true
        },
        {
            path: 'jspm_packages/system.js',
            release: false
        },
        {
            path: 'config.js',
            release: false
        }
    ]
};
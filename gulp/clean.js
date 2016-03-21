module.exports = (workflow, gulp, $) => {

    const del = require('del');
    const chalk = require('chalk');

    workflow.subtask('clean:dist', (done) => {
        del('dist').then((paths) => {
            $.util.log(`Deleted ${chalk.yellow(paths && paths.join(', ') || '-')}`);
            done();
        });
    });

    workflow.subtask('clean:release', (done) => {
        del('release').then((paths) => {
            $.util.log(`Deleted ${chalk.yellow(paths && paths.join(', ') || '-')}`);
            done();
        });
    });
};
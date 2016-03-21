module.exports = (workflow, gulp, $) => {

    workflow.subtask('clean', (done) => {

        const del = require('del');
        const chalk = require('chalk');

        const delDistPromise = del('dist');

        delDistPromise.then((paths) => {
            $.util.log(`Deleted ${chalk.yellow(paths && paths.join(', ') || '-')}`);
            done();
        });
    });
};
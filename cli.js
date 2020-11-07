#!/usr/bin/env node
const { program } = require('commander');
const api = require('./index.js')
const pkg = require('./package.json')

program
    .version(pkg.version)
if (program.xxx) console.log('新增一个xxx');

program.parse(process.argv);
if (process.argv.length === 2) {
    api.showAll().then(() => {
    }, () => {
        console.log('showAll but failed');

    })

}
process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);

});

program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(1, args.length).join(' ')
        api.add(words).then(() => {
            console.log('success add');
        }, () => {
            console.log('add failed');

        })
        //add返回的是一个promise，需要.then做一些事情
    });
program
    .command('clear')
    .description('clear all')
    .action(() => {
        api.clear().then(() => {
            console.log('clear success');
        }, () => {
            console.log('clear fail');

        })
    });




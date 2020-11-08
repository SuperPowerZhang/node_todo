#!/usr/bin/env node
const program = require('commander');
const api = require('./index.js')
const pkg = require('./package.json')

program
    .version(pkg.version)

program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args.slice(1, args.length).join(' ')
        console.log(111 + words);
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


if (process.argv.length === 2) {
    console.log('???');
    void api.showAll()
}

program.parse(process.argv);

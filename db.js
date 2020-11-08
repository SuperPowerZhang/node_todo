const homedir = process.env.HOME || require('os').homedir()
// 获取home变量，没有在使用home路径
const fs = require('fs')
const p = require('path')
const filePath = p.join(homedir, 'list.txt')
const inquirer = require('inquirer')

const db = {
    read() {
        return new Promise((resolve, reject) => {
            console.log('读文件了吗');

            fs.readFile(filePath, { flag: 'a+' }, (error, data) => {
                console.log('进入read了吗');

                if (error) {
                    return reject(error)
                } else {
                    console.log('进到else了吗');

                    let list
                    try {
                        list = JSON.parse(data.toString())
                    } catch (error2) {
                        list = []
                    }
                    resolve(list)
                }
            })
        })
    },
    write(list) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(filePath, string, (error3) => {
                if (error3) {
                    return reject(error3)
                } else {
                    resolve()
                }
            })
        })
    }



}
module.exports = db


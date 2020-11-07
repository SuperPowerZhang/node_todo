const homedir = process.env.HOME || require('os').homedir()
// 获取home变量，没有在使用home路径
const fs = require('fs')
const p = require('path')
const filePath = p.join(homedir, 'list.txt')
const inquirer = require('inquirer')

const db = {
    read() {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, { flag: 'a+' }, (error, data) => {
                if (error) {
                    console.log(error)
                    reject(error)
                } else {
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


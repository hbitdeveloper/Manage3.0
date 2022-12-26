/*
 * @Date: 2022-09-28 14:59:36
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-09 17:02:11
 * @FilePath: \3.0-manger\build\clearDist.js
 * @description: 清空theme文件夹使用
 */
const fs = require('fs')
const path = require('path');
const shell = require("shelljs");

function emptyDir(path) {
    const files = fs.readdirSync(path);
    files.forEach(file => {
        const filePath = `${path}/${file}`;
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            emptyDir(filePath);
        } else {
            fs.unlinkSync(filePath);
            console.log(`theme：删除theme/${file}文件成功`);
        }
    })
}

function rmEmptyDir(path, level = 0) {
    const files = fs.readdirSync(path);
    if (files.length > 0) {
        let tempFile = 0;
        files.forEach(file => {
            tempFile++;
            rmEmptyDir(`${path}/${file}`, 1);
        });
        if (tempFile === files.length && level !== 0) {
            fs.rmdirSync(path);
        }
    } else {
        level !== 0 && fs.rmdirSync(path);
    }
}

function clearDir(path) {
    emptyDir(path)
    rmEmptyDir(path)
}

clearDir(path.resolve(__dirname, `../theme`))
/*
 * @Date: 2022-09-29 11:28:42
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-09 17:03:57
 * @FilePath: \3.0-manger\build\push.js
 * @description: 修改模板上传至模板git
 */
const shell = require("shelljs");
const exec = shell.exec;
const read = require('read-yaml');
const config = read.sync('config.yml');
let name = process.argv[2] || 'dev'; // 第一个参数传店铺
let branch = process.argv[3] || 'master'; // 第二个参数传分支名称

if(!config[name]) {
    shell.echo(`Error: 店铺参数${name}错误`);
    shell.exit(1);
}
console.log(`${name}店铺模板同步至shopify模板git中...`)

// `git subtree push --prefix=theme/${name}/${branch} ${name.toUpperCase()} ${branch}`
exec(`git subtree push --prefix=theme/${name}/${branch} ${name.toUpperCase()} ${branch}`)

// git subtree split --prefix=theme/ca/master --rejoin // push很慢的时候用这个
/*
 * @Date: 2022-09-29 11:17:07
 * @LastEditors: Leo
 * @LastEditTime: 2022-12-09 17:05:35
 * @FilePath: \3.0-manger\build\init.js
 * @description: 初始化绑定子树
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
console.log(`${name}店铺${branch}分支绑定中...`)

// `git subtree add --prefix=theme/${name} ${name} ${branch} --squash`
// git remote add -f UK git@github.com:zzl-leo/shopify-manger-UK.git
//  git remote add -f CA git@github.com:zzl-leo/-shopify-manger-CA.git



exec(`git subtree add --prefix=theme/${name}/${branch} ${name.toUpperCase()} ${branch} --squash`)
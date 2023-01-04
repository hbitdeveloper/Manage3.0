## shopify3.0 模板管理


### 店铺模板关联添加

```
git remote add -f DEV git-url.com // DEV(店铺us、uk等)以及对应仓库地址

// 模板仓库绑定 git subtree add --prefix=theme/${name} ${name} ${branch} --squash
// 第一个参数传店铺   第二个参数传分支名称
npm run init dev main

// 拉取指定店铺模板
npm run pull dev main

// 构建
npm run deploy dev main

// 更新到指定模板仓库（先将本地变更提交）
npm run push dev main
```

### 快捷命令集合
```
yarn pull dev main && yarn deploy dev main && git add . && git commit -m "user-guide-v2" && git push && yarn push dev main
```

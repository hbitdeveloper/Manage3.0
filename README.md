# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## 注意事项
- 如果ID系统, account部分API的对接人是大顺, 请保持平常心和佛系思维, 最后祝你好运
- vite 2.6.x版本会出现打包内存溢出问题，现在降级到2.5.10, 后续关注2.7.x版本情况再酌情升级 - 已解决
- vite 2.6.x 以上版本需要注意字符集问题。https://github.com/vitejs/vite/issues/5833
- 低版本safari 不兼容 a-checkbox, a-select, a-radio 组件, 慎用, 针对此情况, 目前已开发自定义组件y-checkbox, y-radio, y-switch, y-select代替
- 构建命令切记不要使用 --mode test, 会出现UI问题。https://github.com/vueComponent/ant-design-vue/issues/5842

## 测试功能标签
- <div v-test-function></div>
- v-test-function 表示尚未通过验收, 不在生产环境显示的功能

## 后期可能要用到的gzip压缩
- 一个社区开发的插件 vite-plugin-compression，支持多种压缩算法，设置项也很齐全，不过我觉得默认的设置已经满足大部分需求了
`
import viteCompression from 'vite-plugin-compression' 
export default defineConfig({ 
  plugins: [viteCompression()]
})
`
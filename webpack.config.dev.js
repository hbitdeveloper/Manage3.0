/*
 * @Date: 2022-09-27 18:24:11
 * @LastEditors: Leo
 * @LastEditTime: 2023-01-04 11:26:14
 * @FilePath: \3.0-manger\webpack.config.dev.js
 * @description: DEV配置
 */

const {
    merge
} = require('webpack-merge');
const common = require('./webpack.config.common.js');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
    plugins: [
        new CopyPlugin({
            patterns: [{
                    from: path.resolve(__dirname, `src/liquid/dev/snippets/`),
                    to: path.resolve(__dirname, `theme/dev/${process.env.SHOPIFY_THEME || 'main'}/snippets/`),
                    noErrorOnMissing: true // 处理空文件夹报错
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/common/snippets/'),
                    to: path.resolve(__dirname, `theme/dev/${process.env.SHOPIFY_THEME || 'main'}/snippets/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/dev/sections/'),
                    to: path.resolve(__dirname, `theme/dev/${process.env.SHOPIFY_THEME || 'main'}/sections/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/common/sections/'),
                    to: path.resolve(__dirname, `theme/dev/${process.env.SHOPIFY_THEME || 'main'}/sections/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/dev/layout/'),
                    to: path.resolve(__dirname, `theme/dev/${process.env.SHOPIFY_THEME || 'main'}/layout/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/common/layout/'),
                    to: path.resolve(__dirname, `theme/dev/${process.env.SHOPIFY_THEME || 'main'}/layout/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/dev/assets/'),
                    to: path.resolve(__dirname, `theme/dev/${process.env.SHOPIFY_THEME || 'main'}/assets/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/common/assets/'),
                    to: path.resolve(__dirname, `theme/dev/${process.env.SHOPIFY_THEME || 'main'}/assets/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/dev/templates/'),
                    to: path.resolve(__dirname, `theme/dev/${process.env.SHOPIFY_THEME || 'main'}/templates/`),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/common/templates/'),
                    to: path.resolve(__dirname, `theme/dev/${process.env.SHOPIFY_THEME || 'main'}/templates/`),
                    noErrorOnMissing: true
                }
            ]
        })
    ]
})
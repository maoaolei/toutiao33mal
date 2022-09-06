const { defineConfig } = require('@vue/cli-service')
const { resolve } = require('path')
const cpns = resolve(__dirname, 'src/components')
const views = resolve(__dirname, 'src/views')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint检查, 编译时候的eslint的检查
  lintOnSave: false,

  // 原生webpack
  configureWebpack: {
    devServer: {
      open: true,
      port: 8888,
      host: 'localhost'
    },

    // 路径别名
    resolve: {
      alias: {
        cpns,
        views
      }
    }
  }
})

// 所有的postcss插件都是一个函数
const pxToRem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxToRem({
      // 根节点字体大小
      // 如果是vant37.5 如果是自己的代码75  file当前编译的是css文件路径
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*'] //所有属性都转成rem
    })
  ]
}

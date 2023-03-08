const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {},
  mode: 'development',
  plugins: [
    // 详细的插件配置
    // todo html-webpack-plugin 插件：默认会创建一个空的 HTML 文件，自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      // 配置 template 模板，指定模板文件的相对路径，并自动引入打包输出所有的资源
      template: path.join(__dirname, 'public/index.html'),
      // todo 压缩 html 代码
      minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
        removeEmptyAttributes: true, // 移除空属性
        collapseBooleanAttributes: true, // 移除checked类似的布尔值属性
        removeAttributeQuotes: true, // 移除属性上的双引号
        minifyCSS: true, // 压缩内嵌式的css代码（只能基本压缩，不能自动添加前缀）
        minifyJS: true, // 压缩内嵌式的js代码（不能转码）
        removeStyleLinkTypeAttributes: true, // 移除style和link标签上的type属性
        removeScriptTypeAttributes: true // 移除script标签上的默认属性
      }
    })
  ],
  devServer: {
    // static 项目构建后的路径，也就是代码要运行的项目目录
    static: {
      directory: path.join(__dirname, 'public'),
    },
    host: 'localhost', // 启动开发服务器域名
    // port 指定开发服务器的端口号
    port: 9999,
    // compress 是否启动 gzip 压缩，让代码体积更小，速度更快
    compress: true,
    open: true, // open 是否自动打开默认的浏览器
    hot: true // 热更新
  }
}
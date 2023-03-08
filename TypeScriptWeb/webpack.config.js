// 引入路径的包
const path = require('path')

// 引入 html 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 引入清空 dist 中文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// webpack 配置，webpack 所有的配置信息都应该写在 module.exports 中
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",
  // 指定打包文件所在的目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    // 打包后的文件名
    filename: "bundle.js",
    environment: { // 告诉 webpack 在生成的运行时代码中可以使用什么样的 es 特性
      arrowFunction: false,
    }
  },
  mode: "production",
  devServer: {
    compress: true,
    port: 9000,
  },
  // 指定 webpack 打包时要用到的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test 指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的 loader
        // use: "ts-loader",
        use: [ // 加载规则是从后往前解析
          // 配置 babel
          // "babel-loader",
          "ts-loader"
        ],
        // 要排除的文件
        exclude: /mode_modules/
      }
    ]
  },
  // 用来设置引用的模块
  resolve: {
    extensions: ['.js', '.ts'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        // title: "自定义的 Title",
        template: "./src/index.html"
      }
    )
  ]
}


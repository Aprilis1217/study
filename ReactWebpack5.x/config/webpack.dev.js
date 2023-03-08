const path = require('path');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack')
/**
 * todo 引入 eslint-webpack-plugin 检测 js jsx 插件
 * ? eslint 和 prettier 结合校验：eslint prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier
 * ? 一个可扩展的共享配置：eslint-config-airbnb-base
 * ? 用于react的eslint规则：eslint-plugin-react
 * ? typescript相关规则 详细说明：https://www.npmjs.com/package/@typescript-eslint/parser
 *    * typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
 * ? 添加一些 .eslintrc 文件的扩展特性
 *    * standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard eslint-config-standard
 */
const ESlintWebpackPlugin = require('eslint-webpack-plugin')


module.exports = merge(webpackBaseConfig, {
  output: {
    path: undefined,
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js', // * 给打包输出其它文件命名
  },
  mode: 'development',
  // todo devServer 开发服务器，用来自动化（自动编译 自动打开浏览器 自动刷新浏览器）
  // ? 注意点：开发服务器不会输出资源，在内存中编译打包的
  devServer: {
    host: 'localhost', // * 开发服务器域名
    port: 5555, // * 开发服务器端口
    // 使用 History 路由模式时，若404错误时被替代为 index.html
    historyApiFallback: true,
    open: true, // * 打开默认浏览器
    hot: true // todo 开启 js 热更新(HMR) 插件 ReactRefreshWebpackPlugin，react-refresh/babel
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: 'body',
      hash: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    // 激活 js HMR 功能
    new ReactRefreshWebpackPlugin(),
    // eslint-webpack-plugin 插件
    new ESlintWebpackPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, 'src'),
      exclude: 'node_modules', // 默认值
      fix: true // 自动修复 js 格式错误
    })
  ],
});




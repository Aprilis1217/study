const path = require('path');
const { merge } = require('webpack-merge');
// const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base');
// 引入插件 html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 导入 terser-webpack-plugin --> 减少js体积(其中删除js的console.log和注释)
// ? Webpack5.x 内置了 terser-webpack-plugin
const TerserWebpackPlugin = require('terser-webpack-plugin');
// 引入压缩css文件的插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 引入清空 dist 目录下文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// * 插件 git-revision-webpack-plugin 项目构建打包生成Git信息
// const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
// const gitRevisionPlugin = new GitRevisionPlugin()
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 引入 eslint-webpack-plugin 检测 js jsx 插件
const ESlintWebpackPlugin = require('eslint-webpack-plugin')


module.exports = merge(webpackBaseConfig, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].[contenthash:10].chunk.js', // * 给打包输出其它文件命名
    // todo 只删除有变化的资源文件
    // * 插件 clean-webpack-plugin 每次打包前先清空打包目录(dist)下的所有文件
    // clean: true
  },
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 基于我们自己定义的 html 文件为模板生成 html 文件
      filename: 'index.html', // 打包之后的 html 文件名字
      inject: 'body', // todo 将 js 文件注入到 body 最底部
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
    }),
    // todo 每次打包都清空上次的 dist 中的文件
    new CleanWebpackPlugin(),
    // todo Copies individual files or entire directories, which already exist, to the build directory.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../dist'),
          globOptions: {
            // 忽略文件
            ignore: ["**/index.html"],
          },
          info: {
            // 跳过 terser 压缩 js
            minimized: true,
          },
        },
      ],
    }),
    // eslint-webpack-plugin 插件
    new ESlintWebpackPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, 'src'),
      exclude: 'node_modules', // 默认值
      fix: true // 自动修复 js 格式错误
    })
  ],
  // ! 压缩操作
  optimization: {
    minimize: true, // 是否要压缩文件
    // todo 代码分割配置
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 如果项目中使用antd，此时将所有node_modules打包在一起，那么打包输出文件会比较大。
        // 所以我们将node_modules中比较大的模块单独打包，从而并行加载速度更好
        // 如果项目中没有，请删除
        antd: {
          name: "chunk-antd",
          test: /[\\/]node_modules[\\/]antd(.*)/,
          priority: 30,
        },
        // 将react相关的库单独打包，减少node_modules的chunk体积。
        react: {
          name: "react",
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          chunks: "initial",
          priority: 20,
        },
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10, // 权重最低，优先考虑前面内容
          chunks: "initial",
        },
      },
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
    },
    // todo 提取runtime文件
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`, // * runtime文件命名规则
    },
    minimizer: [
      // todo 配置生产环境的压缩方案 css 和 js
      new CssMinimizerPlugin(),
      // 说明：安装 css-minimizer-webpack-plugin 插件后，webpack 默认的 production 环境下的压缩 js 会失效，因此安装 terse-webpack-plugin
      new TerserWebpackPlugin({
        // 开启多线程打包
        // parallel: true,
        // 不将注释提取到单独的文件中
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true, // 清除 console
            // drop_debugger: false, // 清除 debugger
            // pure_funcs: ['console.log'] // 移除 console
          }
        },
      }),
    ],
  },
  // performance: false, // 关闭性能分析，提示速度
  performance: {
    hints: 'warning', // 枚举 false关闭
    maxEntrypointSize: 50000000, // 最大入口文件大小
    maxAssetSize: 30000000, // 最大资源文件大小
    assetFilter: function(assetFilename) { //只给出 js 文件的性能提示
      return assetFilename.endsWith('.js');
    }
  }
});


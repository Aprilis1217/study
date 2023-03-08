// todo 引入 nodejs 核心模块，用于处理文件路径
const path = require('path')
const os = require("os");
// cpu核数
const threads = os.cpus().length;

// 引入插件 html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 导入 terser-webpack-plugin --> 减少js体积(其中删除js的console.log和注释)
// ? Webpack5.x 内置了 terser-webpack-plugin
const TerserWebpackPlugin = require('terser-webpack-plugin');
// 引入提取css文件成为单独的文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 引入压缩css文件的插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
// 引入 eslint-webpack-plugin 检测 js jsx 插件
const ESlintWebpackPlugin = require('eslint-webpack-plugin')

// todo Tree Shaking 是一个术语，通常用于描述移除 JavaScript 中的没有使用上的代码
// ? Webpack5.x 已经默认开启了这个功能，无需其他配置
// ! 注意点：依赖于 ES Module


// todo Webpack5.x 配置信息
module.exports = {
  // ! 指定入口起点文件
  entry: './src/main.js',
  // ! 输出
  output: {
    // ? path 文件输出目录，必须是绝对路径 ---> 将来所有输出的公共目录
    // path.resolve()方法返回一个绝对路径
    path: path.resolve(__dirname, '../dist'), // * __dirname nodejs 的一个变量，代表当前文件目录的绝对路径
    // ? filename 输出的文件名称
    filename: 'static/js/[name].[contenthash:10].js', // * name 默认名称是 main, 若是 entry 是个对象，那这个 name 值就是对象中的 key 值
    chunkFilename: 'static/js/[name].[contenthash:10]_chunk.js', // * 给打包输出其它文件命名
    // todo 图片、字体等通过 type: asset 处理资源命名方式（注意用hash）
    // assetModuleFilename: "static/[name].[hash][ext]",
    // ? 清除上次打包的文件
    clean: true
    /**
     * CleanWebpackPlugin 每次打包前先清空打包目录(dist)下的所有文件
     * webpack5 中新增了output.clean = true也可以实现，使用简单并且更加智能(只删除有变化的资源文件)
     */
  },
  // ! 加载器 loader
  module: {
    // todo 配置 loader 相关信息
    // ? 打包时每个文件都会经过所有 loader 处理，虽然因为 test 正则原因实际没有处理上，但是都要过一遍就会比较慢
    // ! 注意：oneOf 中不能有两个或以上的配置处理同一种类型文件
    rules: [
      {
        oneOf: [ // todo 使用 oneOf 中的 loader 只会匹配其中的一个
          // 配置 css-loader
          {
            test: /\.css/,
            use: [
              // 'style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader', // 处理 css 样式兼容性问题
                options: {
                  postcssOptions: {
                    plugins: [
                      'postcss-preset-env'
                    ]
                  }
                }
              }
            ],
            exclude: /node_modules/
          },
          // 配置 less-loader
          {
            test: /\.less/,
            use: [
              // 'style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader', // 处理 css 样式兼容性问题
                options: {
                  postcssOptions: {
                    plugins: [
                      'postcss-preset-env'
                    ]
                  }
                }
              },
              'less-loader'
            ],
            exclude: /node_modules/
          },
          // 图片静态文件的处理
          {
            test: /\.(?:ico|png|jpg|gif|jpeg|webp|svg)$/,
            type: 'asset', // 将其分割为单独的文件，并导出 url
            generator: {
              filename:'static/images/[name][hash:10][ext]'
            },
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024 // 限制 10K 小于10k的图片会转换称 base64 能减少http请求
              }
            },
            exclude: /node_modules/
          },
          // 对于 svg|eot|ttf|woff|woff2 字体静态资源使用 asset/inline 类型内联一些数据
          {
            test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
            type: 'asset/inline',
            exclude: /node_modules/
          },
          // 配置 html-loader ---> 处理 html 文件中引入的资源
          {
            test: /\.html$/,
            loader: "html-loader",
            exclude: /node_modules/
          },
          // 配置 babel-loader ---> 处理 js 兼容性问题
          {
            test: /\.js/,
            use: [
              {
                loader: 'thread-loader', // * 开启多线程的 loader
                options: {
                  workers: threads // * 电脑 cpu 的核数
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    "@babel/preset-env"
                  ],
                  cacheDirectory: true, // * 开启 babel 编译缓存
                  cacheCompression: false, // * 缓存文件不要压缩
                  plugins: ['@babel/plugin-transform-runtime'], // * 减少代码体积
                }
              }
            ],
            // exclude: /node_modules/ // * 排除 node_modules 下的文件，其他文件都处理
            include: path.resolve(__dirname, '../src') // * 只处理 src 下的文件，其他文件不处理
          },
        ]
      }
    ]
  },
  // ! 插件
  plugins: [
    // todo 扩展 webpack 的功能
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    // todo 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10]_chunk.css",
    }),
    // eslint-webpack-plugin 插件
    new ESlintWebpackPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, 'src'),
      exclude: 'node_modules', // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // * 开启多线程
    })
  ],
  // ! 模式
  mode: 'production', // * 生产模式
  // ! 压缩操作
  optimization: {
    minimize: true,
    // todo 代码分割配置
    splitChunks: {
      chunks: 'all',
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
      // 说明：安装了 css-minimizer-webpack-plugin 插件后，webpack 默认的 production 环境下的压缩 js 会失效，因此安装 terse-webpack-plugin
      new TerserWebpackPlugin({
        // 开启多线程打包
        parallel: threads,
        // 不将注释提取到单独的文件中
        extractComments: false,
        terserOptions: {
          compress: {
            // drop_console: true, // 清除 console
            // drop_debugger: false, // 清除 debugger
            // pure_funcs: ['console.log'] // 移除 console
          }
        },
      }),
    ],
  },
  /* 设置模块如何被解析 */
  resolve: {
    /* 自动解析确定的扩展,频率高的文件尽量写在前面，import 引入这些类型文件时这些扩展名可以省略 */
    extensions: ['.js', '.vue', '.json', '.ts', '.jsx', '.tsx'],
    /* 别名 */
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    // 告诉 webpack 解析模块去哪个目录
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
}


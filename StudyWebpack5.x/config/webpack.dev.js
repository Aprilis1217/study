// todo 引入 nodejs 核心模块，用于处理文件路径
const path = require('path')
const os = require("os");
// cpu核数
const threads = os.cpus().length;

// 引入插件 html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入 eslint-webpack-plugin 检测 js jsx 插件
const ESlintWebpackPlugin = require('eslint-webpack-plugin')


/**
 * TODO entry 入口起点
 * 1. string ---> './src/index.js'
 *    单入口，打包形成一个 chunk, 输出一个 bundle 文件
 *    此时 chunk 的名称默认是 main
 *
 * 2. array ---> ['./src/index.js', './src/add.js']
 *    多入口，所有入口文件最终打包只会形成一个 chunk, 输出也只有一个 bundle 文件
 *
 * 3. object
 *    多入口，有几个文件就会生成几个 chunk, 输出几个 bundle 文件
 *    此时 chunk 的名称就是 key 的名称
 */
// todo Webpack5.x 配置信息
module.exports = {
  // ! 指定入口起点文件
  entry: './src/main.js',
  // entry: ['./src/index.js', './src/add.js'],
  // entry: {
  //   index: './src/index.js',
  //   add: './src/add.js'
  // },
  // ! 输出
  output: {
    // ? path 文件输出目录，必须是绝对路径 ---> 将来所有输出的公共目录
    // path.resolve()方法返回一个绝对路径
    path: undefined, // * __dirname nodejs 的一个变量，代表当前文件目录的绝对路径
    // ? filename 输出的文件名称，webpack 中的命名方式：[name]
    filename: 'static/js/[name].js', // * name 默认名称是 main, 若是 entry 是个对象，那这个 name 值就是对象中的 key 值
    // ? HTML相关：publicPath指定为HTML的相对路径，请求资源时会以当前页面HTML所在路径加上相对路径，构成实际路径
    publicPath: 'auto',
    // ? 清除上次打包的文件
    clean: true,
  },
  // ! 加载器 loader 帮助 webpack 将不同类型的文件转化为  webpack 可识别的模块
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
              'style-loader',
              'css-loader'
            ],
            exclude: /node_modules/
          },
          // 配置 less-loader
          {
            test: /\.less/,
            use: [
              'style-loader',
              'css-loader',
              'less-loader'
            ],
            exclude: /node_modules/
          },
          // 图片静态文件的处理
          {
            test: /\.(?:ico|png|jpg|gif|jpeg|webp|svg)$/,
            type: 'asset', // 将其分割为单独的文件，并导出 url
            generator: {
              filename:'static/images/[name].[contenthash:10][ext]'
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
            exclude: /node_modules/
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
      threads // * 开启多线程
    })
  ],
  // ! 模式
  mode: 'development', // * 开发模式
  // todo devServer 开发服务器，用来自动化（自动编译 自动打开浏览器 自动刷新浏览器）
  // ? 注意点：开发服务器不会输出资源，在内存中编译打包的
  devServer: {
    host: 'localhost', // * 开发服务器域名
    port: '9999', // * 开发服务器端口
    open: true, // * 打开默认浏览器
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


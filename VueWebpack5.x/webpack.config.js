// todo 引入 nodejs 核心模块，用于处理文件路径
const path = require('path')
// 根据相对路径获取绝对路径，path.resolve() 方法返回一个绝对路径，__dirname nodejs 的一个变量，代表当前文件目录的绝对路径
const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
// * 提取 css 成单独文件的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// * 压缩 css 文件的插件
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
// * 用来复制一个单独的文件或者整个目录到新建的文件夹下
const CopyWebpackPlugin = require('copy-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
// * 清空 dist 目录下文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// * 插件 git-revision-webpack-plugin 项目构建打包生成Git信息
// const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
// const gitRevisionPlugin = new GitRevisionPlugin()
// 最新的 vue-loader 中，VueLoaderPlugin 插件的位置有所改变
// const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { VueLoaderPlugin } = require("vue-loader");
// const { DefinePlugin } = require("webpack");

// todo Tree Shaking 是一个术语，通常用于描述移除 JavaScript 中的没有使用上的代码
// ? Webpack5.x 已经默认开启了这个功能，无需其他配置
// ! 注意点：依赖于 ES Module

const getStyleLoaders = (preProcessor) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            'postcss-preset-env' // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor
  ].filter(Boolean)
}

// todo 根据 cross-env 定义环境变量，另外需要在 package.json 中配置 cross-env NODE_ENV=development
const isProduction = process.env.NODE_ENV === 'production'
console.log('isProduction=', isProduction)


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
/**
 * TODO output 输出
 * 1. path ---> 文件输出路径，必须是绝对路径，将来所有输出的公共目录
 *    开发环境没有输出（在内存中编译打包的），生产环境才会有输出
 *
 * 2. filename ---> 'static/js/[name].[contenthash:10].js'
 *    输出的文件名（指定文件名称和目录）
 *    [name] 是 webpack 中的命名方式，默认名称是 main
 *    若是 entry 是个对象，那这个 [name] 值就是对象中的 key 值
 *
 * 3. chunkFilename ---> 'static/js/[name].[contenthash:10].chunk.js'
 *    给打包输出其它文件命名
 *
 * 4. publicPath ---> '/'
 *    指定为 HTML 的相对路径，请求资源时会以当前页面 HTML 所在路径加上相对路径，构成实际路径
 *
 * 5. assetModuleFilename ---> 'static/[name].[hash][ext][query]'
 *    图片、字体等通过 type: asset 处理资源命名方式（注意用hash）
 *
 * 6. clean ---> true
 *    只删除有变化的资源文件
 *
 * 7. library: '[name]', // 整个库向外暴露的变量名
      libraryTarget: 'window', // 变量名挂载到哪个上面
 */
module.exports = {
  // ? 指定入口起点文件
  entry: './src/main.js',
  // ? 输出
  output: {
    // 输出文件的路径
    path: isProduction ? resolvePath('dist') : undefined,
    // 输出文件的名称
    filename: isProduction ? 'static/js/[name].[contenthash:10].js' : 'static/js/[name].js',
    // 给打包输出其它文件命名
    chunkFilename: isProduction ? 'static/js/[name].[contenthash:10].chunk.js' : 'static/js/[name].chunk.js',
    // publicPath: '/', // todo 所有资源引入公共路径的前缀，一般用于生产环境
    // library: '[name]', // * 整个库向外暴露的变量名
    // libraryTarget: 'window', // * 变量名挂载到哪个上面
    // 告诉 webpack 在生成的运行时代码中可以使用什么样的 es 特性
    environment: {
      arrowFunction: !isProduction, // 配置 webpack 不使用箭头函数
      const: !isProduction // 不使用 const
    },
    // 删除有变化的资源文件，简单且更加智能
    clean: true
  },
  /**
  * todo oneOf 中的 loader 只会匹配其中的一个
  *     注意：oneOf 中不能有两个或以上的配置处理同一种类型文件
  * todo oneOf 用来优化生产环境打包构建速度
  */
  // ? loader 配置信息
  module: {
    unknownContextCritical : false,
    rules: [
      // 处理 css 文件
      {
        test: /\.css$/,
        use: getStyleLoaders()
      },
      // 处理 less 文件
      {
        test: /\.less$/,
        use: getStyleLoaders('less-loader')
      },
      // 处理 sass|scss 文件
      {
        test: /\.scss|sass$/,
        use: getStyleLoaders('sass-loader')
      },
      // 处理 vue 文件，vue-loader 不支持 oneOf
      {
        test: /\.vue$/,
        loader: 'vue-loader', // 内部会给 vue 文件注入 HMR 功能代码
        options: {
          // 开启缓存
          cacheDirectory: resolvePath('node_modules/.cache/vue-loader'),
        }
      },
      // 处理 js 文件
      {
        test: /\.(jsx|js)$/,
        include: resolvePath('src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          // plugins: [],
        },
      }
    ]
  },
  // ? 插件
  plugins: [
    // todo VERSION, COMMITHASH, BRANCH, LASTCOMMITDATETIME
    // gitRevisionPlugin, // ? 件生成 VERSION 和 COMMITHASH 文件在构建基于本地 git 存储库
    // new DefinePlugin({
    //   VERSION: JSON.stringify(gitRevisionPlugin.version()),
    //   COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
    //   BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
    //   LASTCOMMITDATETIME: JSON.stringify(gitRevisionPlugin.lastcommitdatetime()),
    // }),
    new NodePolyfillPlugin(),
    // 解决页面警告
    // new DefinePlugin({
    //   __VUE_OPTIONS_API__: "true",
    //   __VUE_PROD_DEVTOOLS__: "false",
    // }),
    new VueLoaderPlugin(),
    // todo html-webpack-plugin 插件：默认会创建一个空的 HTML 文件，自动引入打包输出的所有资源
    new HtmlWebpackPlugin({
      // 配置 template 模板，指定模板文件的相对路径，并自动引入打包输出所有的资源
      template: resolvePath('public/index.html'),
      // todo 压缩 html 代码
      // minify: {
      //   collapseWhitespace: true, // 移除空格
      //   removeComments: true, // 移除注释
      //   removeEmptyAttributes: true, // 移除空属性
      //   collapseBooleanAttributes: true, // 移除checked类似的布尔值属性
      //   removeAttributeQuotes: true, // 移除属性上的双引号
      //   minifyCSS: true, // 压缩内嵌式的css代码（只能基本压缩，不能自动添加前缀）
      //   minifyJS: true, // 压缩内嵌式的js代码（不能转码）
      //   removeStyleLinkTypeAttributes: true, // 移除style和link标签上的type属性
      //   removeScriptTypeAttributes: true // 移除script标签上的默认属性
      // }
    }),
    // todo 把 public 里面的内容全部拷贝到编译目录
    isProduction && new CopyWebpackPlugin({
      patterns: [
        {
          from: resolvePath('public'), // 要拷贝的源目录
          to: resolvePath('dist'), // 要拷贝到的目标目录
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
    // todo 提取css文件成为单独的文件的插件
    isProduction && new MiniCssExtractPlugin({
      // 生成单独的 css 文件重命名
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
    // todo 清空 dist 目录下面的文件
    isProduction && new CleanWebpackPlugin()
  ].filter(Boolean),
  // ? 模式
  mode: isProduction ? 'production' : 'development',
  /**
   * todo devtool 最佳配置选择：
   *    development: 'eval-cheap-module-source-map'
   *    production: 'cheap-module-source-map'
  */
  devtool: isProduction ? 'cheap-module-source-map' : 'source-map',
  // todo 开发服务器 devServer 用来自动化（自动编译、自动打开浏览器、自动刷新浏览器）
  // 注意点：开发服务器不会输出资源，在内存中编译打包的
  devServer: {
    // static 项目构建后的路径，也就是代码要运行的项目目录
    static: resolvePath('dist'),
    host: 'localhost', // 启动开发服务器域名
    // port 指定开发服务器的端口号
    port: 8888,
    // compress 是否启动 gzip 压缩，让代码体积更小，速度更快
    compress: true,
    open: true, // open 是否自动打开默认的浏览器
    hot: true, // 热更新
    // 使用 History 路由模式时，若404错误时被替代为 index.html
    // historyApiFallback: true,
    // 服务器代理，解决开发环境的跨域问题
    proxy: {
      //定义一个标记，如以后api开头的请求都走代理的设置
      // '/api': {
        // 要请求的真实服务端基地址 相当于被/api替代了
        // target: 'https://...',
        // 把api重写为空，因为别人没有 /api
        // pathRewrite: {"^/api":""},
        // 发送请求头中host会设置成target
        // changeOrigin: true
      // }
    }
  },
  // ? 设置模块如何被解析
  resolve: {
    /**
     * todo extensions
     * 自动解析确定的扩展，频率高的文件尽量写在前面
     * import 引入这些类型文件时这些扩展名可以省略
     */
    extensions: ['.vue', '.js', '.ts', 'jsx', '.json'],
    /* 别名 */
    alias: {
      '@': resolvePath('src'),
    },
    // * 特殊说明：fallback 内的配置好像并未生效，不过还是推荐您写上你缺失的组件名
    fallback: {
      // 其他的如果不启用可以用 keyName: false 例如：crypto: false
      // "crypto": require.resolve("crypto-browserify"),
      // "stream": require.resolve("stream-browserify")
    },
    // 告诉 webpack 解析模块去哪个目录
    modules: [resolvePath('src'), 'node_modules']
  },
  // ? 压缩操作
  optimization: {
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
    minimize: isProduction, // 是否要开启压缩文件，false 不开启，后面的都不生效
    minimizer: [
      // todo 配置生产环境的压缩方案 css 和 js
      // 说明：安装 css-minimizer-webpack-plugin 插件后，webpack 默认的 production 环境下的压缩 js 会失效，因此安装 terse-webpack-plugin
      new CssMinimizerWebpackPlugin(),
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
  // todo performance: false, // 关闭性能分析，提示速度
  performance: {
    hints: 'warning', // 枚举 false关闭
    maxEntrypointSize: 50000000, // 最大入口文件大小
    maxAssetSize: 30000000, // 最大资源文件大小
    assetFilter: function(assetFilename) { // 只给出 js 文件的性能提示
      return assetFilename.endsWith('.js');
    }
  }
}


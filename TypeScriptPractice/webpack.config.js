const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')


// process.env.NODE_ENV = 'development'


module.exports = {
  // 指定入口文件
  entry: './src/index.ts',
  // 指定打包文件所在的目录
  output: {
    // 指定打包文件的目录
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // 指定打包文件名称
    environment: { // 告诉 webpack 在生成的运行时代码中可以使用什么样的 es 特性
      arrowFunction: false,
      const: false
    }
  },
  devtool: 'source-map',
  mode: 'development',
  // todo 开发服务器 devServer 用来自动化（自动编译、自动打开浏览器、自动刷新浏览器）
  devServer: {
    // static 项目构建后的路径，也就是代码要运行的项目目录
    static: path.resolve(__dirname, 'dist'),
    // compress 是否启动 gzip 压缩，让代码体积更小，速度更快
    compress: true,
    // port 指定开发服务器的端口号
    port: 8888,
    // open 是否自动打开默认的浏览器
    open: true,
    hot: true
  },
  // 指定 webpack 打包时需要用到的模块
  module: {
    // 指定要加载的规则
    rules: [
      // 处理 ts 文件
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /mode_modules/
      },
      // 处理 css 文件
      {
        test: /\.css$/,
        use: [
          // todo 注意：编写顺序（从下往上，从后往前）
          'style-loader',
          // 为了回头处理 @import 的css文件，写成对象
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      // 处理 less 文件
      {
        test: /\.less$/,
        // todo use 数组中 loader 执行顺序：从后往前
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // @import的css文件，回头能被前面的"less-loader"、"postcss-loader"处理
              importLoaders: 2
            }
          },
          // less-loader 先将less语法转成css 再做兼容性处理
          // 顺序规则，从右往左，从下往上,因为兼容性处理要在css调用之前，所以需要将postcss-loader的配置放在css-loader右边
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  // require('autoprefixer')({})
                  'postcss-preset-env'
                ]
              }
            }
          },
          "less-loader"
        ]
      },
      // todo Webpack4.x 图片以及字体文件处理
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 10K 小于10k的图片会转换称 base64 能减少http请求
              esModule: false,
              name: '[name]_[contenthash:6].[ext]',// 命名  默认是文件名转 MD5 的哈希值
              outputPath: 'assets/images' // 本地资源较多时 指定统一的打包地址
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  // 用来设置引用的模块
  resolve: {
    extensions: ['.js', '.ts'],
  },
  // webpack 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}




const path = require('path')
// 根据相对路径获取绝对路径
const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);
// css 代码打包分离
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 需要通过 cross-env 定义环境变量
const isProduction = process.env.NODE_ENV === "production";
console.log('isProduction=', isProduction)
console.log(process.env.NODE_ENV, 'process.env.NODE_ENV')

const getStyleLoaders = (preProcessor) => {
  return [
    // ? style-loader 创建一个 style 标签，将 js 中的样式资源插入进去，添加到 head 中生效
    // todo style-loader 能激活 css 的 HMR （热更新）功能
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    // MiniCssExtractPlugin.loader,
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
    preProcessor && {
      loader: preProcessor,
      options: preProcessor === 'less-loader' ? {
        // ? 自定义 antd 主题颜色
        lessOptions: {
          modifyVars: {
            // * 其它主体颜色：https://ant.design/docs/react/customize-theme-cn
            '@primary-color': '#1DA57A', // 全局主色
          },
          javascriptEnabled: true,
        }
      } : {}
    },
  ].filter(Boolean);
};

// 基础配置
module.exports = {
  entry: './src/main.js',
  // 所有 loader 的配置都在 module.rules 中
  module: {
    rules: [
      {
        oneOf: [
          // 处理 css 文件 css-loader
          {
            test: /\.css$/,
            use: getStyleLoaders()
          },
          // 处理 less 文件 less-loader
          {
            test: /\.less$/,
            use: getStyleLoaders('less-loader')
          },
          // 图片静态文件的处理
          {
            test: /\.(|png|jpg|gif|jpeg|webp|svg)$/,
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
            test: /\.(woff(2)?|eot|ttf|otf|svg|ico)$/,
            type: 'asset/inline',
            exclude: /node_modules/
          },
          // 配置 html-loader ---> 处理 html 文件中引入的资源
          {
            test: /\.html$/,
            loader: "html-loader",
            exclude: /node_modules/
          },
          // 处理 js jsx 文件
          {
            test: /\.jsx?$/,
            exclude: /node_modules|bower_components/, // 排除文件
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  cacheDirectory: true, // * 开启 babel 编译缓存
                  cacheCompression: false, // * 缓存文件不要压缩
                  plugins: [
                    !isProduction && 'react-refresh/babel', // 配合 ReactRefreshWebpackPlugin 激活 js HMR 功能
                    // '@babel/plugin-transform-runtime', // todo presets 中包含
                  ].filter(Boolean)
                }
              }
            ]
          },
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // todo 提取css成单独文件
    isProduction && new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
  ].filter(Boolean),
  /* 设置模块如何被解析 */
  resolve: {
    /* 自动解析确定的扩展,频率高的文件尽量写在前面，import 引入这些类型文件时这些扩展名可以省略 */
    extensions: ['.js', '.vue', '.json', '.ts', '.jsx', '.tsx'],
    /* 别名 */
    alias: {
      '@': resolvePath('../src')
    },
    // 告诉 webpack 解析模块去哪个目录
    modules: [resolvePath('../src'), 'node_modules']
  },
}



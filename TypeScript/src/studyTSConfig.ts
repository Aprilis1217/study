// 学习 tsconfig.json 配置项

// "removeComments": true, // 配置编译后的 js 文件带不带注释

// include 属性是用来指定要编译的文件的
// exclude 是不包含，除什么文件之外
// files 配置效果和 include 一样

const tsconfig: string = 'TS 配置文件'

// todo ts-node 遵循 tsconfig.js 文件

/**
 * compilerOptions 配置项
 * removeComments 配置编译后的 js 文件带不带注释 true 不带注释 false 带注释
 * strict 属性值设置为 true 表示编译和书写规范要按照 TypeScript 最严格的规范来写，false 表示不需要
 * noImplicitAny 属性值设置为 false 表示允许你的注解类型 any 不用特意表明
 * strictNullChecks 属性值设置为 false 表示不强制检查 null 类型
 * rootDir 属性可以通过 rootDir 来指定 ts 文件的位置
 * outDir 属性可以通过 outDir 来指定编译后的 ts 文件，也就是 js 文件的位置
 * sourceMap 属性设置为 true 在打包的过程中就会给我们生成 sourceMap 文件，Source map 就是一个信息文件，里面储存着位置信息
 * allowJs 编译 ES6 语法到 ES5 语法，"target":'es5' , 默认是开启的，你必须要保证它的开启，才能转换成功 "allowJs":true, 配置项的意思是联通
 * noUnusedLocals 属性值设置为 true 表示没有使用的变量在编译时提示报错
 * noUnusedParameters 属性值设置为 true 表示没有使用的方法在编译时提示报错
 */

// todo https://www.tslang.cn/docs/handbook/compiler-options.html (编译选项详解)


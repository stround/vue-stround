'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue stround' // 页面标题

const port = process.env.port || process.env.npm_config_port || 9527 // dev port

// 所有配置项说明请参见https://cli.vuejs.org/config/
module.exports = {
  /**
    * 需要设置publicPath，如果计划部署网站的子路径
    * 例如GitHub页面。如果计划将站点部署到https://foo.github.io/bar/
    * 那么publicPath应该设置为/bar/
    * 在大多数情况下请使用'/' !!
    * 细节:https://cli.vuejs.org/config/ publicpath
  */
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  // 在npm run build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 生产环境的 source map 是否开启
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080', 
    //     changeOrigin: true,  
    //     pathRewrite:{
    //         '^/api':''
    //     }
    //   }
    // },
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // 在webpack的name字段中提供应用程序的标题，这样
    // 它可以在index.html中访问，以注入正确的标题
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    // 可以提高第一屏的速度，建议开启预加载
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 忽略runtime.js
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 当页面太多时，会导致太多无意义的请求
    config.plugins.delete('prefetch')

    // 设置 svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // ' runtime '必须与runtimecchunk name相同。默认是“runtime”
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 将elementUI拆分为单个包
                  priority: 20, // 重量需要大于libs和app，否则会被打包成libs或app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 为了适应cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可以自定义规则
                  minChunks: 3, //  最低常见的数量
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}

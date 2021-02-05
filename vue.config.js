
module.exports = {
  // ......
  devServer: {
    disableHostCheck: true,
    port: 59999
  },
  chainWebpack: config => {
    config.module
           .rule('images')
           .use('url-loader')
           .loader('url-loader')
           .tap(options => Object.assign(options, { limit: 0 }))
  },
  configureWebpack: {
    plugins: [
    ]
  }
}
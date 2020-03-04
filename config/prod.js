module.exports = {
  env: {
    NODE_ENV: '"production"',
    IMAGE_URL:'http://cdns.cherish553.cn/taro/weather/',
    BASE_URL:'https://free-api.heweather.net/s6/',
    REQUEST_KEY: '74c6266dae0844b9ac5fe4cbda81d585'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}

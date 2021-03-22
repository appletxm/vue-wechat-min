const getCurrentModuleName = require('./current-module-name')

module.exports = {
  moduleName: getCurrentModuleName(), // 发布到私有仓库的模块名称，默认为package.json的name字段名
  port: 8087, // 本地nodejs服务端口
  api: '/api', // 用于配置后台服务接口的统一前缀，暂时不需要使用
  proxy: {
    needOpen: false, // 需不需要开启本地代理，下面的outputCfg的相关host会设置为空
    url: 'http://127.0.0.1:9000' // 需要代理服务的目标服务
  },
  get publicPath() { // 资源文件路径前缀（主要指 src/assets/ 目录下的文件前缀）
    return 'http://' + this.host + ':' + this.port + '/dist/'
  },
  distPath: './dist', // webpack 输出文件目标文件夹
  sourcePath: './src', // webpack 编译或者打包来源文件文件夹
  outputCfg: { // 用于输出cfg.js文件的相关配置项
    apiHost: '', // 配置后端服务器接口地址
    withCredentials: false, // 是否启用http安全头部认证(主要用于跨域请时是否发送cookie，及是否需要要验证跨域目标源地址)
  }
}

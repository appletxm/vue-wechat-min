const getCurrentModuleName = require('./current-module-name')

module.exports = {
  moduleName: getCurrentModuleName(),
  api: '',
  publicPath: '',
  publicPath: '',
  distPath: './dist',
  sourcePath: './src',
  outputCfg: {
    apiHost: 'http://192.168.10.189:6020',
    withCredentials: false
  }
}

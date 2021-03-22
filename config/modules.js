
function getModuleVersion(moduleName) {
  const pkg = require(`../node_modules/${moduleName}/package.json`)
  const version = pkg['version']
  return version
}

module.exports = [
  {
    id: 'sub-module-1',
    moduleName: 'registry-webapp', // 跟package.json所依赖的子系统名相关联
    version: getModuleVersion('registry-webapp'), // 子模块版本
    isInlineModule: false, // 是否是内联模块
    menuId: '', // 后台配置当前模块的主菜单的id
    menuName: '统一登录模块',
    cssName: '', // 子模块对应的样式
    files: { // 非内联模块需要额外加载的文件
      css: ['css/index.min.css'],
      js: ['js/cfg.js', 'js/vendor.min.js', 'js/runtime.min.js', 'js/index.min.js'],
      needUseCommonItem: true
    },
    isLoaded: false, // 非内联模块的加载状态控制
    defaultPageUrl: 'index.html', // 切换子模块后默认打开的页面
    isActived: false, // 当前是否为正在打开的子系统
    isShow: false,
    cfg: { // 需要覆盖相关子模块的配置
      "registrySuccessUrl": "/",
      "loginSuccessUrl": "/",
    }
  }
]

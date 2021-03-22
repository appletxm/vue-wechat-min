const pkg = require('../package.json')

function getCurrentModuleName() {
  return pkg.name
}

module.exports = getCurrentModuleName

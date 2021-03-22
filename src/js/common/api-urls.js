const { api, moduleName } = require('env.cfg')

const url = (window[moduleName] && window[moduleName].apiHost) || api

export default {
  getAnnouncement: `${url}/announcement/get`,
  userLogin: `${url}/user/login`,
  getUserInfo: `${url}/user/info`
}

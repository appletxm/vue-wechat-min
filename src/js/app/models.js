import eventQueue from 'common/event-queue'
import navigatorList from './navigator-list'

const modules = require('modules')

export function getNavigatorList() {
  return navigatorList
}

export function runEventQueue(route) {
  eventQueue.executeQueue(route)
}

export function clearQueue() {
  eventQueue.clearQueue()
}

export function gotoLoginPage() {
  const { moduleName, version } = modules[0]
  window.location.href = `modules/${moduleName}/${version}/index.html`
}

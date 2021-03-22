<template>
  <section :class="[$store.state.appPrefix + '-p-home']">
    <h1>Congratulations!</h1>
    Hey man you did it successful!

    <van-list
      :finished="finished"
      finished-text="没有更多了"
      @load="$getAnnouncementList"
    >
      <div
        v-for="item in dataList"
        :key="item.id"
        class="row"
      >
        <div
          v-for="column in columns"
          :key="column.field"
        >
          <span>{{ column.label }}: </span>{{ item[column.field] }}
        </div>
      </div>
    </van-list>

    <van-button type="primary" @click="$doLoginOut">
      退出登录
    </van-button>
  </section>
</template>

<script>
import messager from 'common/messager'
import eventQueue from 'common/event-queue'
import { checkUserLogin, removeAllCookie } from 'common/auth'
import storage from 'common/storage'
import models from './models'
import columns from './columns'

const modules = require('modules')

export default {
  components: {},
  data() {
    return {
      finished: true,
      columns,
      dataList: [],
      pageSize: 10,
      currentPage: 1,
      total: 0,
      showPop: false
    }
  },
  computed: {},

  watch: {},

  created() {
    if (checkUserLogin()) {
      this.$getAnnouncementList()
    }
    eventQueue.pushEvent({
      key: 'home-page-get-announcement-list',
      event: this.$getAnnouncementList,
      params: [],
      context: this,
      needKeep: true,
      triggerUrl: ['/', '/home']
    })
  },

  mounted() {
  },

  methods: {
    async $getAnnouncementList() {
      messager.showLoading()
      const res = await models.getAnnouncement({
        pageSize: this.pageSize,
        pageNo: this.currentPage
      })
      messager.closeLoading()

      const { data: { list, pagination } } = res
      this.dataList = list
      this.total = pagination.total
    },

    showVantPop() {
      this.showPop = true
    },

    $doLoginOut() {
      const loginModule = modules[0]
      const { moduleName, version, defaultPageUrl } = loginModule
      const loginUrl = `modules/${moduleName}/${version}/${defaultPageUrl}`

      removeAllCookie()
      storage.loginOutRemoveAll()
      window.location.replace(loginUrl)
    }
  }
}
</script>

<template>
  <div :class="[$store.state.appPrefix + '-my-app']">
    <navigator></navigator>
    <div :class="[$store.state.appPrefix + '-module-all']">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navigator from 'components/navigator'
import { checkUserLogin } from 'common/auth'
import { NAVIGATOR_LIST } from 'store/mutation-types'
import { getNavigatorList, gotoLoginPage } from './models'

export default {
  components: {
    navigator
  },
  data() {
    return {
      dialogVisible: true
    }
  },
  watch: {
    '$store.state.needShowLoginPop'(val) {
      if (val === true) {
        gotoLoginPage()
      }
    }
  },
  created() {
    if (!checkUserLogin()) {
      gotoLoginPage()
    }
    const navigatorList = getNavigatorList()
    this.$store.commit(NAVIGATOR_LIST, navigatorList)
  },
  mounted() {
  },
  methods: {}
}
</script>

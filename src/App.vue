<template>
  <div id="app">
    <router-view></router-view>
    <footer-nav v-if="showFooter"></footer-nav>
  </div>
</template>

<script>
import FooterNav from '@/components/FooterNav.vue'

export default {
  name: 'App',
  components: {
    FooterNav
  },
  computed: {
    showFooter() {
      return !['Login', 'Register'].includes(this.$route.name)
    }
  }
}
</script> 
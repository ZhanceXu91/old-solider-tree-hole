<template>
  <div class="footer-nav">
    <div 
      v-for="item in navItems" 
      :key="item.name"
      class="nav-item"
      :class="{ active: currentRoute === item.route }"
      @click="goto(item.route)"
    >
      <i :class="item.icon"></i>
      <span>{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterNav',
  data() {
    return {
      navItems: [
        { text: '随机盲盒', icon: 'el-icon-present', route: 'blind-box' },
        { text: '选人下单', icon: 'el-icon-shopping-cart-2', route: 'order' },
        { text: '动态广场', icon: 'el-icon-picture-outline', route: 'moments' },
        { text: '个人中心', icon: 'el-icon-user', route: 'profile' }
      ]
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name
    }
  },
  methods: {
    goto(route) {
      if (this.currentRoute !== route) {
        this.$router.push({ name: route })
      }
    }
  }
}
</script>

<style scoped>
.footer-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  display: flex;
  border-top: 1px solid #eee;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 12px;
  cursor: pointer;
}

.nav-item i {
  font-size: 20px;
  margin-bottom: 2px;
}

.nav-item.active {
  color: #ff69b4;
}
</style> 
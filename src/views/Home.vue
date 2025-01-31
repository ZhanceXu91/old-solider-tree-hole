<template>
  <div class="home">
    <div class="header">
      <h2>蜜糖恋人</h2>
      <div class="search">
        <el-input
          v-model="searchKey"
          placeholder="搜索陪聊师"
          prefix-icon="el-icon-search"
        ></el-input>
      </div>
    </div>

    <div class="service-types">
      <div class="type-item" v-for="type in serviceTypes" :key="type.id">
        <img :src="type.icon" />
        <span>{{ type.name }}</span>
      </div>
    </div>

    <div class="filter-section">
      <el-radio-group v-model="gender">
        <el-radio label="">全部</el-radio>
        <el-radio label="male">男</el-radio>
        <el-radio label="female">女</el-radio>
      </el-radio-group>
    </div>

    <div class="companion-list">
      <div 
        class="companion-card" 
        v-for="item in filteredCompanions" 
        :key="item.id"
        @click="gotoDetail(item)"
      >
        <div class="avatar">
          <img :src="item.avatar" />
          <span class="online-status" :class="item.online ? 'online' : ''"></span>
        </div>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="tags">
            <el-tag size="mini" v-for="tag in item.tags" :key="tag">{{ tag }}</el-tag>
          </div>
          <div class="price">￥{{ item.price }}/小时</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      searchKey: '',
      gender: '',
      serviceTypes: [
        { id: 1, name: '语音陪聊', icon: require('@/assets/icons/voice.png') },
        { id: 2, name: '游戏陪玩', icon: require('@/assets/icons/game.png') },
        { id: 3, name: '情感咨询', icon: require('@/assets/icons/heart.png') },
        { id: 4, name: '心理疏导', icon: require('@/assets/icons/mind.png') }
      ]
    }
  },
  computed: {
    ...mapState(['companions']),
    filteredCompanions() {
      return this.companions.filter(c => {
        if (this.gender && c.gender !== this.gender) return false
        if (this.searchKey && !c.name.includes(this.searchKey)) return false
        return true
      })
    }
  },
  methods: {
    ...mapActions(['fetchCompanions']),
    gotoDetail(companion) {
      this.$router.push(`/chat/${companion.id}`)
    }
  },
  created() {
    this.fetchCompanions()
  }
}
</script>

<style scoped>
.home {
  padding-bottom: 60px;
}

.header {
  padding: 15px;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.service-types {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px;
  gap: 15px;
  background: #fff;
}

.companion-list {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.companion-card {
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.online-status {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
}

.online-status.online {
  background: #67c23a;
}
</style> 
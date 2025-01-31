<template>
  <div class="blind-box">
    <div class="header">
      <h2>首单免费</h2>
    </div>
    
    <div class="service-select">
      <div class="service-type">
        <h3>店员性别</h3>
        <el-radio-group v-model="gender">
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </div>
      
      <div class="service-type">
        <h3>服务类型</h3>
        <el-checkbox-group v-model="selectedServices">
          <el-checkbox v-for="service in services" :key="service.value" :label="service.value">
            {{ service.label }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      
      <div class="service-type">
        <h3>购买数量</h3>
        <el-input-number v-model="quantity" :min="1" :max="10"></el-input-number>
      </div>
    </div>
    
    <div class="action-buttons">
      <el-button type="primary" @click="submitOrder">立即下单</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlindBox',
  data() {
    return {
      gender: '',
      selectedServices: [],
      quantity: 1,
      services: [
        { label: '文字语音', value: 'voice' },
        { label: '游戏陪玩', value: 'game' },
        { label: '情感咨询', value: 'emotion' },
        { label: '心理疏导', value: 'psychology' }
      ]
    }
  },
  methods: {
    submitOrder() {
      if (!this.gender || this.selectedServices.length === 0) {
        this.$message.warning('请选择性别和服务类型')
        return
      }
      
      this.$store.dispatch('createOrder', {
        gender: this.gender,
        services: this.selectedServices,
        quantity: this.quantity,
        type: 'blind_box'
      }).then(res => {
        if (res.success) {
          this.$message.success('下单成功')
          this.$router.push('/order')
        }
      })
    }
  }
}
</script>

<style scoped>
.blind-box {
  padding: 20px;
}

.service-select {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.service-type {
  margin-bottom: 20px;
}

.service-type h3 {
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

.action-buttons {
  margin-top: 30px;
  text-align: center;
}
</style> 
<template>
  <div class="profile">
    <div class="user-info">
      <img :src="user?.avatar" class="avatar" />
      <div class="info">
        <div class="name">{{ user?.name }}</div>
        <div class="id">ID: {{ user?._id }}</div>
      </div>
    </div>

    <div class="wallet-card">
      <div class="balance">
        <span>钱包余额</span>
        <span class="amount">￥{{ user?.balance || 0 }}</span>
      </div>
      <el-button type="primary" size="small" @click="showRecharge">充值</el-button>
    </div>

    <div class="menu-list">
      <div class="menu-item" @click="$router.push('/orders')">
        <i class="el-icon-document"></i>
        <span>全部订单</span>
      </div>
      <div class="menu-item">
        <i class="el-icon-time"></i>
        <span>待服务</span>
      </div>
      <div class="menu-item">
        <i class="el-icon-service"></i>
        <span>服务中</span>
      </div>
      <div class="menu-item">
        <i class="el-icon-circle-check"></i>
        <span>已完成</span>
      </div>
    </div>

    <div class="menu-list">
      <div class="menu-item">
        <i class="el-icon-star-off"></i>
        <span>收藏店员</span>
      </div>
      <div class="menu-item">
        <i class="el-icon-message"></i>
        <span>留言板</span>
      </div>
      <div class="menu-item">
        <i class="el-icon-setting"></i>
        <span>设置</span>
      </div>
    </div>

    <el-dialog title="充值" :visible.sync="rechargeVisible">
      <el-form :model="rechargeForm">
        <el-form-item label="充值金额">
          <el-input-number v-model="rechargeForm.amount" :min="1"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="rechargeVisible = false">取消</el-button>
        <el-button type="primary" @click="handleRecharge">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      rechargeVisible: false,
      rechargeForm: {
        amount: 100
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    showRecharge() {
      this.rechargeVisible = true
    },
    handleRecharge() {
      // 实现充值功能
      this.$store.dispatch('recharge', this.rechargeForm.amount).then(() => {
        this.rechargeVisible = false
        this.$message.success('充值成功')
      })
    }
  }
}
</script>

<style scoped>
.profile {
  padding: 20px;
}

.user-info {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 15px;
}

.wallet-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.balance .amount {
  font-size: 24px;
  font-weight: bold;
  color: #ff69b4;
  margin-left: 10px;
}

.menu-list {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
}

.menu-item {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item i {
  margin-right: 10px;
  font-size: 20px;
  color: #666;
}
</style> 
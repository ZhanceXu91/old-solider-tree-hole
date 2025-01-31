<template>
  <div class="order-list">
    <div class="order-item" v-for="order in orders" :key="order._id">
      <div class="order-header">
        <img :src="order.companion.avatar" class="avatar" />
        <div class="info">
          <div class="name">{{ order.companion.name }}</div>
          <div class="service">{{ order.serviceType }}</div>
        </div>
        <div class="status" :class="order.status">{{ statusText[order.status] }}</div>
      </div>
      <div class="order-content">
        <div class="detail-item">
          <span class="label">订单编号：</span>
          <span>{{ order._id }}</span>
        </div>
        <div class="detail-item">
          <span class="label">下单时间：</span>
          <span>{{ formatTime(order.createTime) }}</span>
        </div>
        <div class="detail-item">
          <span class="label">服务时长：</span>
          <span>{{ order.duration }}小时</span>
        </div>
        <div class="detail-item">
          <span class="label">订单金额：</span>
          <span class="price">￥{{ order.price }}</span>
        </div>
      </div>
      <div class="order-actions">
        <el-button 
          v-if="order.status === 'pending'" 
          type="primary" 
          size="small"
          @click="startService(order)"
        >
          开始服务
        </el-button>
        <el-button 
          v-if="order.status === 'processing'" 
          type="success" 
          size="small"
          @click="finishService(order)"
        >
          完成服务
        </el-button>
        <el-button 
          type="text"
          @click="$router.push(`/chat/${order.companion._id}`)"
        >
          联系店员
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'OrderList',
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      statusText: {
        pending: '待服务',
        processing: '服务中',
        completed: '已完成'
      }
    }
  },
  methods: {
    formatTime(time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm')
    },
    startService(order) {
      this.$store.dispatch('updateOrderStatus', {
        orderId: order._id,
        status: 'processing'
      })
    },
    finishService(order) {
      this.$store.dispatch('updateOrderStatus', {
        orderId: order._id,
        status: 'completed'
      })
    }
  }
}
</script>

<style scoped>
.order-list {
  padding: 10px;
}

.order-item {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
}

.order-header {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.info {
  flex: 1;
}

.name {
  font-weight: bold;
  margin-bottom: 5px;
}

.service {
  font-size: 12px;
  color: #666;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status.pending {
  background: #fef0f0;
  color: #f56c6c;
}

.status.processing {
  background: #f0f9eb;
  color: #67c23a;
}

.status.completed {
  background: #f4f4f5;
  color: #909399;
}

.order-content {
  padding: 15px 0;
}

.detail-item {
  margin-bottom: 10px;
  font-size: 14px;
}

.label {
  color: #666;
}

.price {
  color: #ff69b4;
  font-weight: bold;
}

.order-actions {
  text-align: right;
  padding-top: 15px;
  border-top: 1px solid #eee;
}
</style> 
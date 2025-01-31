<template>
  <div class="order">
    <div class="tabs">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="全部订单" name="all">
          <order-list :orders="allOrders" />
        </el-tab-pane>
        <el-tab-pane label="待服务" name="pending">
          <order-list :orders="pendingOrders" />
        </el-tab-pane>
        <el-tab-pane label="服务中" name="processing">
          <order-list :orders="processingOrders" />
        </el-tab-pane>
        <el-tab-pane label="已完成" name="completed">
          <order-list :orders="completedOrders" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import OrderList from '@/components/OrderList.vue'

export default {
  name: 'Order',
  components: {
    OrderList
  },
  data() {
    return {
      activeTab: 'all'
    }
  },
  computed: {
    ...mapState(['orders']),
    allOrders() {
      return this.orders
    },
    pendingOrders() {
      return this.orders.filter(o => o.status === 'pending')
    },
    processingOrders() {
      return this.orders.filter(o => o.status === 'processing')
    },
    completedOrders() {
      return this.orders.filter(o => o.status === 'completed')
    }
  },
  created() {
    this.$store.dispatch('fetchOrders')
  }
}
</script>

<style scoped>
.order {
  padding: 20px;
}

.tabs {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}
</style> 
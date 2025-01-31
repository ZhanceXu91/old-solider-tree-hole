<template>
  <div class="chat">
    <div class="chat-header">
      <div class="user-info">
        <img :src="companion?.avatar" class="avatar" />
        <div class="info">
          <div class="name">{{ companion?.name }}</div>
          <div class="status" :class="{ online: companion?.online }">
            {{ companion?.online ? '在线' : '离线' }}
          </div>
        </div>
      </div>
      <div class="actions">
        <el-button type="primary" size="small" @click="showOrderDialog">
          下单
        </el-button>
      </div>
    </div>

    <div class="chat-content" ref="chatContent">
      <div 
        v-for="msg in messages" 
        :key="msg._id" 
        class="message"
        :class="{ 'message-self': msg.fromId === user._id }"
      >
        <img :src="msg.fromId === user._id ? user.avatar : companion.avatar" class="avatar" />
        <div class="message-content">{{ msg.content }}</div>
      </div>
    </div>

    <div class="chat-input">
      <el-input
        v-model="inputMessage"
        type="textarea"
        :rows="3"
        placeholder="输入消息..."
        @keyup.enter.native="sendMessage"
      ></el-input>
      <div class="input-actions">
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>

    <el-dialog title="下单" :visible.sync="orderVisible">
      <el-form :model="orderForm" label-width="80px">
        <el-form-item label="服务类型">
          <el-select v-model="orderForm.serviceType">
            <el-option
              v-for="service in companion?.services"
              :key="service"
              :label="service"
              :value="service"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时长">
          <el-input-number v-model="orderForm.duration" :min="1"></el-input-number>
          小时
        </el-form-item>
        <el-form-item label="总价">
          <span class="price">￥{{ totalPrice }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="orderVisible = false">取消</el-button>
        <el-button type="primary" @click="createOrder">确认下单</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'Chat',
  data() {
    return {
      socket: null,
      inputMessage: '',
      orderVisible: false,
      orderForm: {
        serviceType: '',
        duration: 1
      }
    }
  },
  computed: {
    ...mapState(['user', 'companions', 'messages']),
    companion() {
      return this.companions.find(c => c._id === this.$route.params.id)
    },
    totalPrice() {
      return this.companion?.price * this.orderForm.duration
    }
  },
  methods: {
    initSocket() {
      this.socket = io('/', {
        query: {
          token: this.$store.state.token
        }
      })

      this.socket.on('message', (message) => {
        this.$store.commit('ADD_MESSAGE', message)
        this.scrollToBottom()
      })
    },
    sendMessage() {
      if (!this.inputMessage.trim()) return

      const message = {
        fromId: this.user._id,
        toId: this.companion._id,
        content: this.inputMessage,
        type: 'text'
      }

      this.socket.emit('message', message)
      this.inputMessage = ''
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const content = this.$refs.chatContent
        content.scrollTop = content.scrollHeight
      })
    },
    showOrderDialog() {
      this.orderVisible = true
    },
    createOrder() {
      const order = {
        companionId: this.companion._id,
        ...this.orderForm
      }

      this.$store.dispatch('createOrder', order).then(() => {
        this.orderVisible = false
        this.$message.success('下单成功')
      })
    }
  },
  created() {
    this.initSocket()
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}
</script>

<style scoped>
.chat {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 10px 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.status {
  font-size: 12px;
  color: #999;
}

.status.online {
  color: #67c23a;
}

.chat-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.message-self {
  flex-direction: row-reverse;
}

.message-self .avatar {
  margin-right: 0;
  margin-left: 10px;
}

.message-content {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  max-width: 70%;
}

.message-self .message-content {
  background: #95ec69;
}

.chat-input {
  padding: 20px;
  background: #fff;
  border-top: 1px solid #eee;
}

.input-actions {
  margin-top: 10px;
  text-align: right;
}

.price {
  color: #ff69b4;
  font-size: 20px;
  font-weight: bold;
}
</style> 
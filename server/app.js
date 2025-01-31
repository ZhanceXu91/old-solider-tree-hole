const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const socketIO = require('socket.io')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())

// 数据库连接
mongoose.connect('mongodb://localhost/honey-chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 模型定义
const User = mongoose.model('User', {
  username: String,
  password: String,
  role: String,
  avatar: String,
  tags: [String],
  price: Number,
  online: Boolean,
  gender: String,
  services: [String],
  balance: Number
})

const Order = mongoose.model('Order', {
  userId: String,
  companionId: String,
  serviceType: String,
  duration: Number,
  status: String,
  createTime: Date,
  price: Number
})

const Message = mongoose.model('Message', {
  fromId: String,
  toId: String,
  content: String,
  type: String,
  createTime: Date
})

const Post = mongoose.model('Post', {
  userId: String,
  content: String,
  images: [String],
  createTime: Date,
  likes: Number
})

// 中间件 - 验证 token
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: '未登录' })
  }
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret')
    req.user = await User.findById(decoded.userId)
    next()
  } catch (err) {
    res.status(401).json({ message: '登录已过期' })
  }
}

// API 路由
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username, password })
  if (user) {
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret')
    res.json({ success: true, token, user })
  } else {
    res.json({ success: false, message: '用户名或密码错误' })
  }
})

app.get('/api/companions', async (req, res) => {
  const { gender, service, priceRange } = req.query
  let query = { role: 'companion' }
  
  if (gender) query.gender = gender
  if (service) query.services = service
  
  const companions = await User.find(query)
  res.json(companions)
})

app.post('/api/orders', authMiddleware, async (req, res) => {
  const order = new Order({
    ...req.body,
    userId: req.user._id,
    createTime: new Date(),
    status: 'pending'
  })
  await order.save()
  res.json({ success: true, order })
})

app.get('/api/orders', authMiddleware, async (req, res) => {
  const orders = await Order.find({ userId: req.user._id })
  res.json(orders)
})

app.post('/api/posts', authMiddleware, async (req, res) => {
  const post = new Post({
    ...req.body,
    userId: req.user._id,
    createTime: new Date(),
    likes: 0
  })
  await post.save()
  res.json({ success: true, post })
})

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().sort({ createTime: -1 })
  res.json(posts)
})

// WebSocket 处理
io.on('connection', (socket) => {
  console.log('用户连接')
  
  socket.on('join', async (userId) => {
    socket.userId = userId
    await User.findByIdAndUpdate(userId, { online: true })
    io.emit('userOnline', userId)
  })
  
  socket.on('message', async (data) => {
    const message = new Message({
      ...data,
      createTime: new Date()
    })
    await message.save()
    io.to(data.toId).emit('message', message)
  })
  
  socket.on('disconnect', async () => {
    if (socket.userId) {
      await User.findByIdAndUpdate(socket.userId, { online: false })
      io.emit('userOffline', socket.userId)
    }
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 
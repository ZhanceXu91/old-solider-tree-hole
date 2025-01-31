const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.mongodb.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const User = require('./models/user')

const initData = {
  companions: [
    {
      username: 'sweetie',
      password: '123456',
      role: 'companion',
      name: '小甜心',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      gender: 'female',
      tags: ['温柔', '治愈系', '声音甜美'],
      services: ['语音陪聊', '情感咨询'],
      price: 188,
      online: true
    },
    // 添加更多初始数据...
  ]
}

async function init() {
  try {
    await User.deleteMany({})
    await User.insertMany(initData.companions)
    console.log('Database initialized successfully')
    process.exit(0)
  } catch (error) {
    console.error('Error initializing database:', error)
    process.exit(1)
  }
}

init() 
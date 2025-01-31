<template>
  <div class="moments">
    <div class="post-form">
      <el-input
        type="textarea"
        v-model="newPost.content"
        placeholder="分享新动态..."
        :rows="3"
      ></el-input>
      <div class="form-actions">
        <el-upload
          action="/api/upload"
          list-type="picture-card"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-button type="primary" @click="submitPost">发布</el-button>
      </div>
    </div>

    <div class="post-list">
      <div class="post-item" v-for="post in posts" :key="post._id">
        <div class="post-header">
          <img :src="post.user.avatar" class="avatar" />
          <div class="user-info">
            <div class="username">{{ post.user.name }}</div>
            <div class="time">{{ formatTime(post.createTime) }}</div>
          </div>
        </div>
        <div class="post-content">{{ post.content }}</div>
        <div class="post-images" v-if="post.images && post.images.length">
          <img v-for="img in post.images" :key="img" :src="img" />
        </div>
        <div class="post-actions">
          <span @click="likePost(post)">
            <i class="el-icon-star-off"></i>
            {{ post.likes }}
          </span>
          <span @click="showComments(post)">
            <i class="el-icon-chat-dot-round"></i>
            评论
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'Moments',
  data() {
    return {
      newPost: {
        content: '',
        images: []
      }
    }
  },
  computed: {
    ...mapState(['posts'])
  },
  methods: {
    formatTime(time) {
      return dayjs(time).format('MM-DD HH:mm')
    },
    handleUploadSuccess(res) {
      this.newPost.images.push(res.url)
    },
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        this.$message.error('只能上传图片文件')
      }
      return isImage
    },
    submitPost() {
      if (!this.newPost.content.trim()) {
        this.$message.warning('请输入内容')
        return
      }
      
      this.$store.dispatch('createPost', this.newPost).then(() => {
        this.newPost.content = ''
        this.newPost.images = []
        this.$message.success('发布成功')
      })
    },
    likePost(post) {
      // 实现点赞功能
    },
    showComments(post) {
      // 实现评论功能
    }
  },
  created() {
    this.$store.dispatch('fetchPosts')
  }
}
</script>

<style scoped>
.moments {
  padding: 20px;
}

.post-form {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.form-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-list {
  background: #fff;
  border-radius: 8px;
}

.post-item {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  margin: 10px 0;
}

.post-images img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.post-actions {
  margin-top: 10px;
  color: #666;
}

.post-actions span {
  margin-right: 20px;
  cursor: pointer;
}

.post-actions i {
  margin-right: 5px;
}
</style> 
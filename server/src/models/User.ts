import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  gender: String,
  level: Number,
  location: String,
  services: [String],
  tags: [String],
  online: Boolean,
  voice: {
    duration: Number,
    url: String
  }
});

export const User = mongoose.model('User', userSchema); 
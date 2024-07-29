import mongoose from 'mongoose';
export let userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
});

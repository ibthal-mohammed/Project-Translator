import mongoose from 'mongoose';
export let userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
});

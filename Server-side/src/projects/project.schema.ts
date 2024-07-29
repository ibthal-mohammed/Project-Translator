import mongoose, { Schema } from 'mongoose';
export let projectSchema = new mongoose.Schema({
  title: String,
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  targetLanguage: String,
});

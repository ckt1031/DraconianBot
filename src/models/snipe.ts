import { SnipeConfig } from '../sturctures/database';
import { Schema, model } from 'mongoose';

const ModuleSchema = new Schema<SnipeConfig>({
  channelId: { type: String },
  author: {
    id: { type: String },
    name: { type: String },
  },
  content: {
    text: { type: String },
    date: { type: Number },
    imageURL: { type: String, required: false },
  },
});

export default model('snipes', ModuleSchema);

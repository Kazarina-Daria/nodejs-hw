import mongoose from 'mongoose';
import { model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: TAGS,
      default: 'Todo',
    },
  },
  {
    timestamps: true,
  },
);

noteSchema.index(
  { title: 'text', content: 'text' },
  { weights: { title: 5, content: 1 }, default_language: 'english' },
);
export const Note = model('Note', noteSchema);

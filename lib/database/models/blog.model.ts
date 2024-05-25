import { Document, Schema, model, models } from "mongoose";

export interface IBlog extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl: string;
  isPremium: boolean;
  category: { _id: string, name: string }
  author: { _id: string, firstName: string, lastName: string }
}

const BlogSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  isPremium: { type: Boolean, default: false },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Blog = models.Blog || model('Blog', BlogSchema);

export default Blog;
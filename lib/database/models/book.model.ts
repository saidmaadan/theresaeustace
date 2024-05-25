import { Document, Schema, model, models } from "mongoose";

export interface IBook extends Document {
  _id: string;
  title: string;
  description?: string;
  createdAt: Date;
  imageUrl: string;
  isFeature: boolean;
  isNewReleased: boolean;
  buyNowUrl?: string;
  author: { _id: string, firstName: string, lastName: string }
}

const BookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  isFeature: { type: Boolean, default: false },
  isNewReleased: { type: Boolean, default: false },
  buyNowUrl: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
})

const Book = models.Book || model('Book', BookSchema);

export default Book;
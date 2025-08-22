
import { model, Schema } from 'mongoose';

export const Order = model('Order', new Schema({
  table: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ['WAITING', 'IN_PRODUCTION', 'DONE']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true // remove later if not needed
  },
  products: {
    required: true,
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }]
  }
}));

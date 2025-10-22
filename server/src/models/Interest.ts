import mongoose, { Schema, Document } from 'mongoose'

export interface IInterest extends Document {
  name: string
  email: string
  phone?: string
  organization?: string
  message?: string
  dept?: string
  products?: string
  createdAt: Date
}

const InterestSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    organization: { type: String },
    message: { type: String },
    dept: { type: String },
    products: { type: String },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
)

export default mongoose.models.Interest || mongoose.model<IInterest>('Interest', InterestSchema)

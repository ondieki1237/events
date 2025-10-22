import mongoose, { Schema, Document } from 'mongoose'

export interface IFeedback extends Document {
  name: string
  email: string
  rating: number
  feedback?: string
  createdAt: Date
}

const FeedbackSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true },
    feedback: { type: String },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } },
)

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema)

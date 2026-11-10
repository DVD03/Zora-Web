import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IService extends Document {
  title: string;
  slug: string;
  iconName: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStackUsed: string[];
  startingTimeline: string;
  packagePrice?: string;
  glowColor: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    iconName: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    deliverables: { type: [String], default: [] },
    techStackUsed: { type: [String], default: [] },
    startingTimeline: { type: String, required: true, trim: true },
    packagePrice: { type: String, default: '', trim: true },
    glowColor: { type: String, default: '#00F0FF' },
    displayOrder: { type: Number, default: 1, index: true },
  },
  { timestamps: true }
);

export const ServiceModel: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);


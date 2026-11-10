import mongoose, { Schema, type Document, type Model } from 'mongoose';
import { CORE_SERVICES_ENUM } from '@/lib/security';

export interface IImpactMetric {
  label: string;
  value: string;
}

export interface IProject extends Document {
  title: string;
  slug: string;
  category: (typeof CORE_SERVICES_ENUM)[number];
  clientName: string;
  completionDate: string;
  summary: string;
  challenge: string;
  solution: string;
  impactMetrics: IImpactMetric[];
  techStack: string[];
  thumbnailUrl: string;
  galleryImages: string[];
  liveUrl?: string;
  figmaUrl?: string;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const ImpactMetricSchema = new Schema<IImpactMetric>(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: CORE_SERVICES_ENUM,
      index: true,
    },
    clientName: { type: String, required: true, trim: true },
    completionDate: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    challenge: { type: String, required: true, trim: true },
    solution: { type: String, required: true, trim: true },
    impactMetrics: { type: [ImpactMetricSchema], default: [] },
    techStack: { type: [String], default: [] },
    thumbnailUrl: { type: String, required: true, trim: true },
    galleryImages: { type: [String], default: [] },
    liveUrl: { type: String, trim: true, default: '' },
    figmaUrl: { type: String, trim: true, default: '' },
    isFeatured: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 1, index: true },
  },
  { timestamps: true }
);

export const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);


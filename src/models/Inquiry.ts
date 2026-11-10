import mongoose, { Schema, type Document, type Model } from 'mongoose';

export type InquiryStatus = 'New' | 'Contacted' | 'In-Discussion' | 'Won' | 'Archived';
export type PreferredContactFounder = 'Panduka' | 'Dilum' | 'Any';

export interface IInquiry extends Document {
  clientName: string;
  companyName?: string;
  email: string;
  phone: string;
  whatsappNumber?: string;
  selectedServices: string[];
  estimatedBudget: string;
  projectBrief: string;
  preferredContact: PreferredContactFounder;
  ipHash: string;
  status: InquiryStatus;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: 120,
      default: '',
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
      index: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    whatsappNumber: {
      type: String,
      trim: true,
      maxlength: 30,
      default: '',
    },
    selectedServices: {
      type: [String],
      required: true,
      default: [],
    },
    estimatedBudget: {
      type: String,
      required: true,
      trim: true,
    },
    projectBrief: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },
    preferredContact: {
      type: String,
      enum: ['Panduka', 'Dilum', 'Any'],
      default: 'Any',
    },
    ipHash: {
      type: String,
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In-Discussion', 'Won', 'Archived'],
      default: 'New',
      index: true,
    },
    adminNotes: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: '',
    },
  },
  { timestamps: true }
);

export const InquiryModel: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);


import mongoose, { Schema, type Document, type Model } from 'mongoose';

export type QuotationStatus = 'Generated' | 'Sent_WhatsApp' | 'Converted';

export interface QuotationLineItem {
  name: string;
  category: string;
  billingType: 'One-Time' | 'Monthly';
  price: number;
}

export interface IQuotation extends Document {
  quoteNumber: string;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  notes: string;
  primaryService: string;
  selectedItems: QuotationLineItem[];
  hostingTier: string;
  oneTimeTotal: number;
  monthlyTotal: number;
  estimatedWeeks: number;
  usdRateNoteAccepted: boolean;
  status: QuotationStatus;
  ipHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuotationLineItemSchema = new Schema<QuotationLineItem>(
  {
    name: { type: String, required: true, trim: true, maxlength: 180 },
    category: { type: String, required: true, trim: true, maxlength: 100 },
    billingType: { type: String, enum: ['One-Time', 'Monthly'], required: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const QuotationSchema = new Schema<IQuotation>(
  {
    quoteNumber: { type: String, required: true, unique: true, trim: true },
    clientName: { type: String, required: true, trim: true, maxlength: 100 },
    companyName: { type: String, default: '', trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    notes: { type: String, default: '', trim: true, maxlength: 2000 },
    primaryService: { type: String, required: true, trim: true, maxlength: 120 },
    selectedItems: { type: [QuotationLineItemSchema], required: true, default: [] },
    hostingTier: { type: String, required: true, trim: true, maxlength: 140 },
    oneTimeTotal: { type: Number, required: true, min: 0 },
    monthlyTotal: { type: Number, required: true, min: 0 },
    estimatedWeeks: { type: Number, required: true, min: 1, default: 2 },
    usdRateNoteAccepted: { type: Boolean, required: true, default: true },
    status: {
      type: String,
      enum: ['Generated', 'Sent_WhatsApp', 'Converted'],
      default: 'Generated',
    },
    ipHash: { type: String, default: '' },
  },
  { timestamps: true }
);

export const QuotationModel: Model<IQuotation> =
  mongoose.models.Quotation || mongoose.model<IQuotation>('Quotation', QuotationSchema);


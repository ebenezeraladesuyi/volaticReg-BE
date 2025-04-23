import { Document, Model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IWaitlist extends Document {
  name: string;
  email: string;
  phone: string;
  userType: 'reader' | 'author';
  createdAt: Date;
  updatedAt: Date;
}

export interface IWaitlistModel extends Model<IWaitlist> {
  paginate: typeof mongoosePaginate;
}
import mongoose, { Document, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { IWaitlist, IWaitlistModel } from '../types/WaitlistAcademosInterface';

// TypeScript interface for the Waitlist document
// export interface IWaitlist extends Document {
//   name: string;
//   email: string;
//   phone: string;
//   userType: 'reader' | 'author';
//   createdAt: Date;
//   updatedAt: Date;
// }


const WaitlistSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Please enter a valid email address',
      },
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      validate: {
        validator: (value: string) => {
          // Basic international phone number validation
          return /^\+?[\d\s-]{10,}$/.test(value);
        },
        message: 'Please enter a valid phone number',
      },
    },
    userType: {
      type: String,
      required: [true, 'User type is required'],
      enum: ['reader', 'author'],
      default: 'reader',
    },
  },
  {
    timestamps: true, 
  }
);

// Index for faster querying
WaitlistSchema.index({ email: 1 }, { unique: true });
WaitlistSchema.index({ userType: 1 });

// Pre-save hook for additional validation/processing
WaitlistSchema.pre<IWaitlist>('save', function (next) {
  // Remove any non-digit characters from phone number
  this.phone = this.phone.replace(/\D/g, '');
  next();
});

// Create and export the model
// const Waitlist = mongoose.model<IWaitlist>('Waitlist', WaitlistSchema);
// export default Waitlist;


// export interface IWaitlistModel extends Model<IWaitlist> {
//     paginate: typeof mongoosePaginate;
//   }

WaitlistSchema.plugin(mongoosePaginate);

const Waitlist: IWaitlistModel = mongoose.model<IWaitlist, IWaitlistModel>('Waitlist', WaitlistSchema);
export default Waitlist;
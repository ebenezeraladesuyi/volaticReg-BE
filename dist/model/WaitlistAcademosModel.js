"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
// TypeScript interface for the Waitlist document
// export interface IWaitlist extends Document {
//   name: string;
//   email: string;
//   phone: string;
//   userType: 'reader' | 'author';
//   createdAt: Date;
//   updatedAt: Date;
// }
const WaitlistSchema = new mongoose_1.Schema({
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
            validator: (value) => {
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
            validator: (value) => {
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
}, {
    timestamps: true,
});
// Index for faster querying
WaitlistSchema.index({ email: 1 }, { unique: true });
WaitlistSchema.index({ userType: 1 });
// Pre-save hook for additional validation/processing
WaitlistSchema.pre('save', function (next) {
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
WaitlistSchema.plugin(mongoose_paginate_v2_1.default);
const Waitlist = mongoose_1.default.model('Waitlist', WaitlistSchema);
exports.default = Waitlist;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWaitlistEntry = exports.getWaitlistEntry = exports.getWaitlistEntries = exports.addToWaitlist = void 0;
const WaitlistAcademosModel_1 = __importDefault(require("../model/WaitlistAcademosModel"));
/**
 * @desc    Add a new waitlist entry
 * @route   POST /api/waitlist
 * @access  Public
 */
const addToWaitlist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, userType = 'reader' } = req.body;
        // Validate required fields
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and phone number',
            });
        }
        // Check if email already exists
        const existingEntry = yield WaitlistAcademosModel_1.default.findOne({ email });
        if (existingEntry) {
            return res.status(409).json({
                success: false,
                message: 'This email is already on our waitlist',
            });
        }
        const waitlistEntry = new WaitlistAcademosModel_1.default({
            name,
            email,
            phone,
            userType,
        });
        yield waitlistEntry.save();
        res.status(201).json({
            success: true,
            message: 'Thank you for joining our waitlist!',
            data: {
                id: waitlistEntry._id,
                name: waitlistEntry.name,
                email: waitlistEntry.email,
                userType: waitlistEntry.userType,
            },
        });
    }
    catch (error) {
        console.error('Waitlist error:', error);
        if (error instanceof Error) {
            const err = error;
            if (err.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: 'This email is already on our waitlist',
                });
            }
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: err.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
});
exports.addToWaitlist = addToWaitlist;
/**
 * @desc    Get all waitlist entries (admin only)
 * @route   GET /api/waitlist
 * @access  Private/Admin
 */
const getWaitlistEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userType, page = '1', limit = '20' } = req.query;
        // Build query
        const query = {};
        if (userType)
            query.userType = userType;
        // Convert string values to numbers
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        // Properly typed pagination options
        const options = {
            page: pageNumber,
            limit: limitNumber,
            sort: { createdAt: -1 },
            select: '-__v',
        };
        // Using proper typing for paginate method
        const result = yield WaitlistAcademosModel_1.default.paginate(query, options);
        res.status(200).json({
            success: true,
            data: {
                total: result.totalDocs,
                pages: result.totalPages,
                page: result.page,
                limit: result.limit,
                entries: result.docs,
            },
        });
    }
    catch (error) {
        console.error('Get waitlist error:', error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
});
exports.getWaitlistEntries = getWaitlistEntries;
/**
 * @desc    Get waitlist entry by ID
 * @route   GET /api/waitlist/:id
 * @access  Private/Admin
 */
const getWaitlistEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entry = yield WaitlistAcademosModel_1.default.findById(req.params.id).select('-__v');
        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Waitlist entry not found',
            });
        }
        res.status(200).json({
            success: true,
            data: entry,
        });
    }
    catch (error) {
        console.error('Get waitlist entry error:', error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
});
exports.getWaitlistEntry = getWaitlistEntry;
/**
 * @desc    Delete waitlist entry
 * @route   DELETE /api/waitlist/:id
 * @access  Private/Admin
 */
const deleteWaitlistEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const entry = yield WaitlistAcademosModel_1.default.findByIdAndDelete(req.params.id);
        if (!entry) {
            return res.status(404).json({
                success: false,
                message: 'Waitlist entry not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Waitlist entry removed successfully',
            data: {
                id: entry._id,
                email: entry.email,
            },
        });
    }
    catch (error) {
        console.error('Delete waitlist error:', error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Server error',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
            });
        }
    }
});
exports.deleteWaitlistEntry = deleteWaitlistEntry;

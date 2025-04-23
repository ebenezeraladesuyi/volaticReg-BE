import { Request, Response } from 'express';
import Waitlist from '../model/WaitlistAcademosModel';
import { IWaitlist } from '../types/WaitlistAcademosInterface';

interface ErrorWithCode extends Error {
  code?: number;
  statusCode?: number;
}

interface PaginationQuery {
  page?: string;
  limit?: string;
  userType?: 'reader' | 'author';
}

/**
 * @desc    Add a new waitlist entry
 * @route   POST /api/waitlist
 * @access  Public
 */
export const addToWaitlist = async (req: Request, res: Response) => {
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
    const existingEntry = await Waitlist.findOne({ email });
    if (existingEntry) {
      return res.status(409).json({
        success: false,
        message: 'This email is already on our waitlist',
      });
    }

    const waitlistEntry: IWaitlist = new Waitlist({
      name,
      email,
      phone,
      userType,
    });

    await waitlistEntry.save();

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
  } catch (error: unknown) {
    console.error('Waitlist error:', error);
    
    if (error instanceof Error) {
      const err = error as ErrorWithCode;
      
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
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

/**
 * @desc    Get all waitlist entries (admin only)
 * @route   GET /api/waitlist
 * @access  Private/Admin
 */
export const getWaitlistEntries = async (req: Request<{}, {}, {}, PaginationQuery>, res: Response) => {
    try {
      const { userType, page = '1', limit = '20' } = req.query;
  
      // Build query
      const query: { userType?: 'reader' | 'author' } = {};
      if (userType) query.userType = userType;
  
      // Convert string values to numbers
      const pageNumber = parseInt(page, 10);
      const limitNumber = parseInt(limit, 10);
  
      // Properly typed pagination options
      const options: {
        page: number;
        limit: number;
        sort: { [key: string]: 1 | -1 };
        select?: string | { [key: string]: 0 | 1 };
        lean?: boolean;
      } = {
        page: pageNumber,
        limit: limitNumber,
        sort: { createdAt: -1 },
        select: '-__v',
      };
  
      // Using proper typing for paginate method
      const result = await (Waitlist as any).paginate(query, options);
  
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
    } catch (error: unknown) {
      console.error('Get waitlist error:', error);
      
      if (error instanceof Error) {
        res.status(500).json({
          success: false,
          message: 'Server error',
          error: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An unknown error occurred',
        });
      }
    }
  };

/**
 * @desc    Get waitlist entry by ID
 * @route   GET /api/waitlist/:id
 * @access  Private/Admin
 */
export const getWaitlistEntry = async (req: Request, res: Response) => {
  try {
    const entry = await Waitlist.findById(req.params.id).select('-__v');

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
  } catch (error: unknown) {
    console.error('Get waitlist entry error:', error);
    
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

/**
 * @desc    Delete waitlist entry
 * @route   DELETE /api/waitlist/:id
 * @access  Private/Admin
 */
export const deleteWaitlistEntry = async (req: Request, res: Response) => {
  try {
    const entry = await Waitlist.findByIdAndDelete(req.params.id);

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
  } catch (error: unknown) {
    console.error('Delete waitlist error:', error);
    
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};
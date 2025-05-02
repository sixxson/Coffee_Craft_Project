import { Request, Response, NextFunction } from 'express';
import * as revenueService from '../../services/stats/revenue.service'; // Use named import
import { Period } from '../../utils/period.util'; // Import Period type if needed for casting

// Define a type for the validated query parameters
interface ValidatedPeriodQuery {
    period?: Period;
    startDate?: string;
    endDate?: string;
}

export const getRevenueSummary = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Assuming validation middleware has run and placed validated data in req.query
        const queryParams = req.query as unknown as ValidatedPeriodQuery;
        const summary = await revenueService.getRevenueSummary(queryParams);
        res.json(summary);
    } catch (error) {
        next(error);
    }
};

export const getRevenueByPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = req.query as unknown as ValidatedPeriodQuery;
        const data = await revenueService.getRevenueByPaymentMethod(queryParams);
        res.json({
            startDate: queryParams.startDate, // Or get from service result if modified
            endDate: queryParams.endDate,     // Or get from service result if modified
            data
        });
    } catch (error) {
        next(error);
    }
};

export const getOrdersByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = req.query as unknown as ValidatedPeriodQuery;
        const data = await revenueService.getOrdersByStatus(queryParams);
         res.json({
            startDate: queryParams.startDate,
            endDate: queryParams.endDate,
            data
        });
    } catch (error) {
        next(error);
    }
};

export const getOrdersByPaymentStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = req.query as unknown as ValidatedPeriodQuery;
        const data = await revenueService.getOrdersByPaymentStatus(queryParams);
         res.json({
            startDate: queryParams.startDate,
            endDate: queryParams.endDate,
            data
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderFinancials = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queryParams = req.query as unknown as ValidatedPeriodQuery;
        const financials = await revenueService.getOrderFinancials(queryParams);
        res.json(financials);
    } catch (error) {
        next(error);
    }
};

// --- Added controller for Order Trend ---
interface ValidatedOrderTrendQuery {
    period?: Period;
    startDate?: string;
    endDate?: string;
    groupBy: 'day' | 'month' | 'year'; // Defaulted by Joi
}

export const getOrderCreationTrend = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Use validatedQuery if validation middleware sets it, otherwise fallback to req.query
        const queryParams = (req.validatedQuery || req.query) as ValidatedOrderTrendQuery;
        const result = await revenueService.getOrderCreationTrend(
            queryParams.groupBy,
            queryParams.period,
            queryParams.startDate,
            queryParams.endDate
        );
        res.json(result);
    } catch (error) {
        next(error);
    }
};

// Export controller functions
export default {
    getRevenueSummary,
    getRevenueByPaymentMethod,
    getOrdersByStatus,
    getOrdersByPaymentStatus,
    getOrderFinancials,
    getOrderCreationTrend, // Add new controller function
};
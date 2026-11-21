import { DemandMetric, OperatorCompliance } from '../types';
export declare class MockAnalyticsService {
    static getHourlyDemand(): Promise<DemandMetric[]>;
    static getOperatorCompliance(): Promise<OperatorCompliance[]>;
    static getPeriodicDemand(period: 'weekly' | 'monthly' | 'six_monthly' | 'yearly'): Promise<{
        name: string;
        passengers: number;
        trips: number;
        congestionIndex: number;
    }[] | {
        name: string;
        passengers: number;
        trips: number;
        congestionIndex: number;
    }[] | {
        name: string;
        passengers: number;
        trips: number;
        congestionIndex: number;
    }[] | {
        name: string;
        passengers: number;
        trips: number;
        congestionIndex: number;
    }[]>;
}

import { DemandMetric, OperatorCompliance } from '../types';
export declare const mockHourlyDemand: DemandMetric[];
export declare const mockOperatorCompliance: OperatorCompliance[];
export declare const mockPeriodicDemand: {
    weekly: {
        name: string;
        passengers: number;
        trips: number;
        congestionIndex: number;
    }[];
    monthly: {
        name: string;
        passengers: number;
        trips: number;
        congestionIndex: number;
    }[];
    six_monthly: {
        name: string;
        passengers: number;
        trips: number;
        congestionIndex: number;
    }[];
    yearly: {
        name: string;
        passengers: number;
        trips: number;
        congestionIndex: number;
    }[];
};

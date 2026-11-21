import { CheckerEntry, Bus } from '../types';
export declare class MockCheckerService {
    private static entries;
    private static offlineQueue;
    static getRegisteredBuses(routeId: string, direction: 'up' | 'down'): Promise<Bus[]>;
    static submitCount(data: {
        busId: string;
        licensePlate: string;
        company: string;
        companyBn: string;
        checkpointId: string;
        checkpointName: string;
        checkpointNameBn: string;
        sitting: number;
        standing: number;
        simulatedDistanceMeters?: number;
    }): Promise<{
        success: boolean;
        entry?: CheckerEntry;
        error?: string;
    }>;
    static getEntries(): Promise<CheckerEntry[]>;
    static getEntryById(id: string): Promise<CheckerEntry | undefined>;
    static correctEntry(id: string, newSitting: number, newStanding: number, reason: string): Promise<CheckerEntry | null>;
    static voidEntry(id: string): Promise<boolean>;
    static getOfflineQueue(): Promise<CheckerEntry[]>;
    static syncOfflineQueue(): Promise<{
        syncedCount: number;
    }>;
}

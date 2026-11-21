import { Complaint } from '../types';
export declare class MockComplaintService {
    private static complaints;
    static getComplaints(filter?: 'all' | 'open' | 'in_review' | 'resolved'): Promise<Complaint[]>;
    static getComplaintById(id: string): Promise<Complaint | undefined>;
    static submitComplaint(data: {
        against: 'checker' | 'bus_staff' | 'bus';
        targetName: string;
        busLicensePlate?: string;
        category: string;
        categoryBn: string;
        description: string;
        photoUrl?: string;
        checkpointName?: string;
    }): Promise<Complaint>;
    static resolveComplaint(id: string, resolutionNote: string): Promise<Complaint | null>;
}

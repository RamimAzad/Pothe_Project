import { mockBuses } from '../fixtures/buses';
import { mockCheckerEntries, mockQueuedOfflineEntries } from '../fixtures/entries';
export class MockCheckerService {
    static entries = [...mockCheckerEntries];
    static offlineQueue = [...mockQueuedOfflineEntries];
    static async getRegisteredBuses(routeId, direction) {
        return Promise.resolve(mockBuses.filter((b) => b.routeId === routeId));
    }
    static async submitCount(data) {
        // If distance > 150m, trigger geofence error
        const distance = data.simulatedDistanceMeters ?? 0;
        if (distance > 150) {
            return Promise.resolve({
                success: false,
                error: `Geofence Restriction Failed. You are outside the checkpoint area (${distance}m away).`,
            });
        }
        const newEntry = {
            id: `entry-${Date.now()}`,
            busId: data.busId,
            licensePlate: data.licensePlate,
            company: data.company,
            companyBn: data.companyBn,
            checkpointId: data.checkpointId,
            checkpointName: data.checkpointName,
            checkpointNameBn: data.checkpointNameBn,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            sittingCount: data.sitting,
            standingCount: data.standing,
            status: 'saved',
            isLocked: false,
            secondsRemainingInGrace: 300, // 5 min
        };
        this.entries.unshift(newEntry);
        return Promise.resolve({ success: true, entry: newEntry });
    }
    static async getEntries() {
        return Promise.resolve([...this.entries]);
    }
    static async getEntryById(id) {
        return Promise.resolve(this.entries.find((e) => e.id === id));
    }
    static async correctEntry(id, newSitting, newStanding, reason) {
        const entry = this.entries.find((e) => e.id === id);
        if (!entry)
            return null;
        entry.originalSitting = entry.sittingCount;
        entry.originalStanding = entry.standingCount;
        entry.sittingCount = newSitting;
        entry.standingCount = newStanding;
        entry.correctionReason = reason;
        entry.status = 'corrected';
        return Promise.resolve({ ...entry });
    }
    static async voidEntry(id) {
        const entry = this.entries.find((e) => e.id === id);
        if (!entry)
            return false;
        entry.status = 'voided';
        return Promise.resolve(true);
    }
    static async getOfflineQueue() {
        return Promise.resolve([...this.offlineQueue]);
    }
    static async syncOfflineQueue() {
        const count = this.offlineQueue.length;
        this.offlineQueue.forEach((e) => {
            this.entries.unshift({ ...e, status: 'saved' });
        });
        this.offlineQueue = [];
        return Promise.resolve({ syncedCount: count });
    }
}

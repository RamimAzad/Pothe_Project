import { mockBuses } from '../fixtures/buses';
import { mockCheckerEntries, mockQueuedOfflineEntries } from '../fixtures/entries';
import { CheckerEntry, Bus } from '../types';

export class MockCheckerService {
  private static entries: CheckerEntry[] = [...mockCheckerEntries];
  private static offlineQueue: CheckerEntry[] = [...mockQueuedOfflineEntries];

  static async getRegisteredBuses(routeId: string, direction: 'up' | 'down'): Promise<Bus[]> {
    return Promise.resolve(mockBuses.filter((b) => b.routeId === routeId));
  }

  static async submitCount(data: {
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
  }): Promise<{ success: boolean; entry?: CheckerEntry; error?: string }> {
    // If distance > 150m, trigger geofence error
    const distance = data.simulatedDistanceMeters ?? 0;
    if (distance > 150) {
      return Promise.resolve({
        success: false,
        error: `Geofence Restriction Failed. You are outside the checkpoint area (${distance}m away).`,
      });
    }

    const newEntry: CheckerEntry = {
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

  static async getEntries(): Promise<CheckerEntry[]> {
    return Promise.resolve([...this.entries]);
  }

  static async getEntryById(id: string): Promise<CheckerEntry | undefined> {
    return Promise.resolve(this.entries.find((e) => e.id === id));
  }

  static async correctEntry(
    id: string,
    newSitting: number,
    newStanding: number,
    reason: string
  ): Promise<CheckerEntry | null> {
    const entry = this.entries.find((e) => e.id === id);
    if (!entry) return null;

    entry.originalSitting = entry.sittingCount;
    entry.originalStanding = entry.standingCount;
    entry.sittingCount = newSitting;
    entry.standingCount = newStanding;
    entry.correctionReason = reason;
    entry.status = 'corrected';
    return Promise.resolve({ ...entry });
  }

  static async voidEntry(id: string): Promise<boolean> {
    const entry = this.entries.find((e) => e.id === id);
    if (!entry) return false;
    entry.status = 'voided';
    return Promise.resolve(true);
  }

  static async getOfflineQueue(): Promise<CheckerEntry[]> {
    return Promise.resolve([...this.offlineQueue]);
  }

  static async syncOfflineQueue(): Promise<{ syncedCount: number }> {
    const count = this.offlineQueue.length;
    this.offlineQueue.forEach((e) => {
      this.entries.unshift({ ...e, status: 'saved' });
    });
    this.offlineQueue = [];
    return Promise.resolve({ syncedCount: count });
  }
}

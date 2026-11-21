import { mockHourlyDemand, mockOperatorCompliance, mockPeriodicDemand, } from '../fixtures/analytics';
export class MockAnalyticsService {
    static async getHourlyDemand() {
        return Promise.resolve([...mockHourlyDemand]);
    }
    static async getOperatorCompliance() {
        return Promise.resolve([...mockOperatorCompliance]);
    }
    static async getPeriodicDemand(period) {
        return Promise.resolve(mockPeriodicDemand[period] || mockPeriodicDemand.weekly);
    }
}

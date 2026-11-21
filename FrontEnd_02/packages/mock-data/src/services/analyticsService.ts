import {
  mockHourlyDemand,
  mockOperatorCompliance,
  mockPeriodicDemand,
} from '../fixtures/analytics';
import { DemandMetric, OperatorCompliance } from '../types';

export class MockAnalyticsService {
  static async getHourlyDemand(): Promise<DemandMetric[]> {
    return Promise.resolve([...mockHourlyDemand]);
  }

  static async getOperatorCompliance(): Promise<OperatorCompliance[]> {
    return Promise.resolve([...mockOperatorCompliance]);
  }

  static async getPeriodicDemand(period: 'weekly' | 'monthly' | 'six_monthly' | 'yearly') {
    return Promise.resolve(mockPeriodicDemand[period] || mockPeriodicDemand.weekly);
  }
}

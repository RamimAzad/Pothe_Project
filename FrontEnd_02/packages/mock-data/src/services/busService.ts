import { mockRoutes } from '../fixtures/routes';
import { mockBuses, mockEstimatedBuses } from '../fixtures/buses';
import { mockCheckerEntries } from '../fixtures/entries';
import { Route, EstimatedBus, Bus, CheckerEntry, Checkpoint } from '../types';

export class MockBusService {
  static async getRoutes(): Promise<Route[]> {
    return Promise.resolve([...mockRoutes]);
  }

  static async getRouteById(id: string): Promise<Route | undefined> {
    return Promise.resolve(mockRoutes.find((r) => r.id === id));
  }

  static async getBusesBehindPassenger(routeId: string, currentStopId: string): Promise<{
    mostLikely: EstimatedBus[];
    lessLikely: EstimatedBus[];
  }> {
    const buses = mockEstimatedBuses.filter((b) => b.routeId === routeId);
    return Promise.resolve({
      mostLikely: buses.filter((b) => b.probabilityTier === 'most_likely'),
      lessLikely: buses.filter((b) => b.probabilityTier === 'less_likely'),
    });
  }

  static async getBusDetail(busId: string): Promise<{
    bus: Bus | undefined;
    estimatedPosition: EstimatedBus | undefined;
    route: Route | undefined;
  }> {
    const bus = mockBuses.find((b) => b.id === busId || b.licensePlate === busId);
    const estimated = mockEstimatedBuses.find((b) => b.id === busId || b.licensePlate === busId);
    const route = bus ? mockRoutes.find((r) => r.id === bus.routeId) : mockRoutes[0];
    return Promise.resolve({ bus, estimatedPosition: estimated, route });
  }

  static async getRouteCheckpoints(routeId: string): Promise<Checkpoint[]> {
    const route = mockRoutes.find((r) => r.id === routeId);
    return Promise.resolve(route ? route.checkpoints : []);
  }

  static async getCheckerFeed(routeId: string): Promise<CheckerEntry[]> {
    return Promise.resolve(
      mockCheckerEntries.filter((e) => e.status !== 'voided' && e.status !== 'pending_sync')
    );
  }
}

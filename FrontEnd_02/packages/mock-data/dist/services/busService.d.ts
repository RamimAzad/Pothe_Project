import { Route, EstimatedBus, Bus, CheckerEntry, Checkpoint } from '../types';
export declare class MockBusService {
    static getRoutes(): Promise<Route[]>;
    static getRouteById(id: string): Promise<Route | undefined>;
    static getBusesBehindPassenger(routeId: string, currentStopId: string): Promise<{
        mostLikely: EstimatedBus[];
        lessLikely: EstimatedBus[];
    }>;
    static getBusDetail(busId: string): Promise<{
        bus: Bus | undefined;
        estimatedPosition: EstimatedBus | undefined;
        route: Route | undefined;
    }>;
    static getRouteCheckpoints(routeId: string): Promise<Checkpoint[]>;
    static getCheckerFeed(routeId: string): Promise<CheckerEntry[]>;
}

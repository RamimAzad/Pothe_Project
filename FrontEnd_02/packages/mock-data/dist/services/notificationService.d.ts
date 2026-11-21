import { NotificationItem, RouteAlertSubscription } from '../types';
export declare class MockNotificationService {
    private static notifications;
    private static subscriptions;
    static getNotifications(): Promise<NotificationItem[]>;
    static markAllAsRead(): Promise<void>;
    static getRouteSubscriptions(): Promise<RouteAlertSubscription[]>;
    static toggleSubscription(routeId: string, isEnabled: boolean): Promise<RouteAlertSubscription | null>;
}

import { mockNotifications, mockRouteSubscriptions } from '../fixtures/notifications';
import { NotificationItem, RouteAlertSubscription } from '../types';

export class MockNotificationService {
  private static notifications: NotificationItem[] = [...mockNotifications];
  private static subscriptions: RouteAlertSubscription[] = [...mockRouteSubscriptions];

  static async getNotifications(): Promise<NotificationItem[]> {
    return Promise.resolve([...this.notifications]);
  }

  static async markAllAsRead(): Promise<void> {
    this.notifications.forEach((n) => {
      n.isUnread = false;
    });
    return Promise.resolve();
  }

  static async getRouteSubscriptions(): Promise<RouteAlertSubscription[]> {
    return Promise.resolve([...this.subscriptions]);
  }

  static async toggleSubscription(routeId: string, isEnabled: boolean): Promise<RouteAlertSubscription | null> {
    const sub = this.subscriptions.find((s) => s.routeId === routeId);
    if (!sub) return null;
    sub.isEnabled = isEnabled;
    return Promise.resolve({ ...sub });
  }
}

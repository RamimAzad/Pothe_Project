import { mockNotifications, mockRouteSubscriptions } from '../fixtures/notifications';
export class MockNotificationService {
    static notifications = [...mockNotifications];
    static subscriptions = [...mockRouteSubscriptions];
    static async getNotifications() {
        return Promise.resolve([...this.notifications]);
    }
    static async markAllAsRead() {
        this.notifications.forEach((n) => {
            n.isUnread = false;
        });
        return Promise.resolve();
    }
    static async getRouteSubscriptions() {
        return Promise.resolve([...this.subscriptions]);
    }
    static async toggleSubscription(routeId, isEnabled) {
        const sub = this.subscriptions.find((s) => s.routeId === routeId);
        if (!sub)
            return null;
        sub.isEnabled = isEnabled;
        return Promise.resolve({ ...sub });
    }
}

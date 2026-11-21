export const DEMO_USERS = {
    passenger: {
        id: 'user-pax-1',
        name: 'Ramim Azad',
        phone: '+880 1712-345678',
        email: 'ramim@example.com',
        role: 'passenger',
        isVerified: true,
    },
    checker: {
        id: 'user-chk-8801',
        name: 'Rahim Uddin',
        phone: '+880 1812-345678',
        role: 'checker',
        isVerified: true,
        assignedCheckpointId: 'cp-mirpur-10',
        assignedRouteId: 'route-7',
        shift: '6:00 AM – 2:00 PM (Morning)',
    },
    owner: {
        id: 'user-owner-1',
        name: 'Al-Haj Rafiqul Islam',
        phone: '+880 1912-345678',
        email: 'rafiqul@thikanabus.com',
        role: 'owner',
        company: 'Thikana Paribahan',
        isVerified: true,
    },
    gov: {
        id: 'user-gov-1',
        name: 'Dr. Shahabuddin Ahmed',
        phone: '+880 1512-345678',
        email: 'planning@dtca.gov.bd',
        role: 'gov',
        isVerified: true,
    },
};
export class MockAuthService {
    static STORAGE_KEY = 'pothe_auth_user';
    static getCurrentUser(fallbackRole = 'passenger') {
        const raw = localStorage.getItem(this.STORAGE_KEY);
        if (raw) {
            try {
                return JSON.parse(raw);
            }
            catch {
                // ignore
            }
        }
        return DEMO_USERS[fallbackRole] || DEMO_USERS.passenger;
    }
    static setCurrentUser(user) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }
    static logout() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
    static getDemoUser(role) {
        return DEMO_USERS[role] || DEMO_USERS.passenger;
    }
}

import { User, UserRole } from '../types';
export declare const DEMO_USERS: Record<string, User>;
export declare class MockAuthService {
    private static STORAGE_KEY;
    static getCurrentUser(fallbackRole?: UserRole): User;
    static setCurrentUser(user: User): void;
    static logout(): void;
    static getDemoUser(role: UserRole): User;
}

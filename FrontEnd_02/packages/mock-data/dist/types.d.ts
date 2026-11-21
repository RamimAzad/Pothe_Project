export type Language = 'en' | 'bn';
export type UserRole = 'passenger' | 'checker' | 'owner' | 'gov' | 'admin';
export interface User {
    id: string;
    name: string;
    phone: string;
    email?: string;
    role: UserRole;
    isVerified: boolean;
    assignedCheckpointId?: string;
    assignedRouteId?: string;
    shift?: string;
    company?: string;
}
export interface Checkpoint {
    id: string;
    name: string;
    nameBn: string;
    order: number;
    lat: number;
    lng: number;
    geofenceRadiusMeters: number;
    currentSitting?: number;
    currentStanding?: number;
    crowdLevel?: 'low' | 'medium' | 'high';
    lastUpdatedAgo?: string;
}
export interface Route {
    id: string;
    name: string;
    nameBn: string;
    origin: string;
    originBn: string;
    destination: string;
    destinationBn: string;
    via: string;
    viaBn: string;
    distanceKm: number;
    durationMin: number;
    trafficLevel: 'light' | 'moderate' | 'heavy';
    isRecommended?: boolean;
    busesBehindCount: number;
    checkpoints: Checkpoint[];
}
export interface Bus {
    id: string;
    licensePlate: string;
    company: string;
    companyBn: string;
    routeId: string;
    seatingCapacity: number;
    standingCapacity: number;
    totalCapacity: number;
    driverName?: string;
    status: 'active' | 'in_depot' | 'maintenance';
}
export interface EstimatedBus {
    id: string;
    licensePlate: string;
    company: string;
    companyBn: string;
    routeId: string;
    etaMinutes: number;
    confidenceScore: number;
    probabilityTier: 'most_likely' | 'less_likely';
    lastSeenCheckpoint: string;
    lastSeenCheckpointBn: string;
    lastSeenTimeAgo: string;
    sittingCount: number;
    sittingCapacity: number;
    standingCount: number;
    standingCapacity: number;
    crowdStatus: 'low' | 'medium' | 'high';
    missingAtLastCheckpoint?: boolean;
    currentSegmentProgress: number;
}
export interface CheckerEntry {
    id: string;
    busId: string;
    licensePlate: string;
    company: string;
    companyBn: string;
    checkpointId: string;
    checkpointName: string;
    checkpointNameBn: string;
    timestamp: string;
    sittingCount: number;
    standingCount: number;
    status: 'saved' | 'corrected' | 'voided' | 'pending_sync';
    originalSitting?: number;
    originalStanding?: number;
    correctionReason?: string;
    isLocked: boolean;
    secondsRemainingInGrace: number;
}
export interface ComplaintTimelineStep {
    title: string;
    time: string;
    isCompleted: boolean;
}
export interface Complaint {
    id: string;
    complaintAgainst: 'checker' | 'bus_staff' | 'bus';
    targetName: string;
    busLicensePlate?: string;
    category: string;
    categoryBn: string;
    description: string;
    photoUrl?: string;
    status: 'open' | 'in_review' | 'resolved';
    createdAt: string;
    checkpointName?: string;
    timeline: ComplaintTimelineStep[];
    resolutionNote?: string;
}
export interface NotificationItem {
    id: string;
    type: 'bus_approaching' | 'complaint_resolved' | 'traffic_delay';
    title: string;
    titleBn: string;
    message: string;
    messageBn: string;
    timeAgo: string;
    timeAgoBn: string;
    isUnread: boolean;
    etaPill?: string;
    busId?: string;
    complaintId?: string;
}
export interface RouteAlertSubscription {
    routeId: string;
    routeName: string;
    routeNameBn: string;
    isEnabled: boolean;
}
export interface DemandMetric {
    checkpointName: string;
    hour: string;
    avgSitting: number;
    avgStanding: number;
    totalPassengers: number;
    capacityUtilization: number;
}
export interface OperatorCompliance {
    company: string;
    registeredBuses: number;
    activeToday: number;
    onTimePunctuality: number;
    complianceRate: number;
    totalComplaints: number;
}

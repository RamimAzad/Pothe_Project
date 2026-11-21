import { DemandMetric, OperatorCompliance } from '../types';

export const mockHourlyDemand: DemandMetric[] = [
  { checkpointName: 'Mirpur 12', hour: '07:00', avgSitting: 28, avgStanding: 8, totalPassengers: 36, capacityUtilization: 47 },
  { checkpointName: 'Mirpur 10', hour: '08:00', avgSitting: 36, avgStanding: 32, totalPassengers: 68, capacityUtilization: 89 },
  { checkpointName: 'Kazipara', hour: '08:30', avgSitting: 36, avgStanding: 38, totalPassengers: 74, capacityUtilization: 97 },
  { checkpointName: 'Farmgate', hour: '09:00', avgSitting: 36, avgStanding: 35, totalPassengers: 71, capacityUtilization: 93 },
  { checkpointName: 'Shahbag', hour: '09:30', avgSitting: 32, avgStanding: 18, totalPassengers: 50, capacityUtilization: 66 },
  { checkpointName: 'Motijheel', hour: '10:00', avgSitting: 20, avgStanding: 4, totalPassengers: 24, capacityUtilization: 32 },
  { checkpointName: 'Mirpur 10', hour: '17:00', avgSitting: 34, avgStanding: 25, totalPassengers: 59, capacityUtilization: 78 },
  { checkpointName: 'Farmgate', hour: '18:00', avgSitting: 36, avgStanding: 39, totalPassengers: 75, capacityUtilization: 99 },
];

export const mockOperatorCompliance: OperatorCompliance[] = [
  { company: 'Thikana Paribahan', registeredBuses: 24, activeToday: 21, onTimePunctuality: 94, complianceRate: 96, totalComplaints: 3 },
  { company: 'Bihanga Paribahan', registeredBuses: 18, activeToday: 15, onTimePunctuality: 88, complianceRate: 91, totalComplaints: 5 },
  { company: 'Alif Enterprise', registeredBuses: 20, activeToday: 17, onTimePunctuality: 85, complianceRate: 88, totalComplaints: 7 },
  { company: 'Bikolpo Paribahan', registeredBuses: 16, activeToday: 14, onTimePunctuality: 89, complianceRate: 90, totalComplaints: 4 },
  { company: 'Shikhor Paribahan', registeredBuses: 15, activeToday: 12, onTimePunctuality: 82, complianceRate: 84, totalComplaints: 8 },
];

export const mockPeriodicDemand = {
  weekly: [
    { name: 'Mon', passengers: 14200, trips: 280, congestionIndex: 78 },
    { name: 'Tue', passengers: 15100, trips: 295, congestionIndex: 82 },
    { name: 'Wed', passengers: 14800, trips: 288, congestionIndex: 80 },
    { name: 'Thu', passengers: 16200, trips: 310, congestionIndex: 88 },
    { name: 'Fri', passengers: 8500, trips: 180, congestionIndex: 45 },
    { name: 'Sat', passengers: 13900, trips: 270, congestionIndex: 75 },
    { name: 'Sun', passengers: 14600, trips: 285, congestionIndex: 79 },
  ],
  monthly: [
    { name: 'Week 1', passengers: 98000, trips: 1950, congestionIndex: 79 },
    { name: 'Week 2', passengers: 104000, trips: 2040, congestionIndex: 83 },
    { name: 'Week 3', passengers: 101500, trips: 2000, congestionIndex: 81 },
    { name: 'Week 4', passengers: 108200, trips: 2120, congestionIndex: 85 },
  ],
  six_monthly: [
    { name: 'Jun', passengers: 420000, trips: 8400, congestionIndex: 76 },
    { name: 'Jul', passengers: 445000, trips: 8700, congestionIndex: 80 },
    { name: 'Aug', passengers: 438000, trips: 8600, congestionIndex: 79 },
    { name: 'Sep', passengers: 462000, trips: 9100, congestionIndex: 82 },
    { name: 'Oct', passengers: 480000, trips: 9400, congestionIndex: 85 },
    { name: 'Nov', passengers: 495000, trips: 9650, congestionIndex: 86 },
  ],
  yearly: [
    { name: '2023', passengers: 4800000, trips: 95000, congestionIndex: 74 },
    { name: '2024', passengers: 5200000, trips: 102000, congestionIndex: 78 },
    { name: '2025', passengers: 5650000, trips: 110000, congestionIndex: 81 },
    { name: '2026', passengers: 6100000, trips: 118000, congestionIndex: 84 },
  ],
};

import { mockComplaints } from '../fixtures/complaints';
export class MockComplaintService {
    static complaints = [...mockComplaints];
    static async getComplaints(filter) {
        if (!filter || filter === 'all') {
            return Promise.resolve([...this.complaints]);
        }
        return Promise.resolve(this.complaints.filter((c) => c.status === filter));
    }
    static async getComplaintById(id) {
        return Promise.resolve(this.complaints.find((c) => c.id === id));
    }
    static async submitComplaint(data) {
        const newComplaint = {
            id: `C-${Math.floor(1000 + Math.random() * 9000)}`,
            complaintAgainst: data.against,
            targetName: data.targetName,
            busLicensePlate: data.busLicensePlate,
            category: data.category,
            categoryBn: data.categoryBn,
            description: data.description,
            photoUrl: data.photoUrl,
            checkpointName: data.checkpointName || 'Mirpur 10 Checkpoint',
            status: 'open',
            createdAt: 'Today',
            timeline: [
                { title: 'Submitted', time: 'Just now', isCompleted: true },
                { title: 'Forwarded to Bus Owner / Admin', time: 'Pending', isCompleted: false },
                { title: 'In Review', time: 'Pending', isCompleted: false },
                { title: 'Resolved', time: 'Pending', isCompleted: false },
            ],
        };
        this.complaints.unshift(newComplaint);
        return Promise.resolve(newComplaint);
    }
    static async resolveComplaint(id, resolutionNote) {
        const complaint = this.complaints.find((c) => c.id === id);
        if (!complaint)
            return null;
        complaint.status = 'resolved';
        complaint.resolutionNote = resolutionNote;
        complaint.timeline.forEach((step) => {
            step.isCompleted = true;
            if (step.time === 'Pending') {
                step.time = 'Just now';
            }
        });
        return Promise.resolve({ ...complaint });
    }
}

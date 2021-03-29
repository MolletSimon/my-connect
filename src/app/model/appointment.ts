export interface Appointment {
    _id: string;
    description: string;
    subject: string;
    endTime: Date;
    isAllDay: boolean;
    location: string;
    recurrenceRule: string;
    startTime: Date;
    group: {
        id: string;
        color: string;
        name: string;
    }
}
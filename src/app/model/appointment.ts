export interface Appointment {
    _id: string;
    Description: string;
    Subject: string;
    EndTime: Date;
    IsAllDay: boolean;
    Location: string;
    RecurrenceRule: string;
    StartTime: Date;
    group: {
        id: string;
        color: string;
        name: string;
    }
}
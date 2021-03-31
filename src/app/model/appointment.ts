import { Group } from './group';
export interface Appointment {
    _id: string;
    Description: string;
    Subject: string;
    EndTime: Date;
    IsAllDay: boolean;
    Location: string;
    RecurrenceRule: string;
    StartTime: Date;
    group: Group
}
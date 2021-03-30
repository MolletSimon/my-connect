import { Group } from './group';
export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    groups: Group[];
    isSuperadmin: boolean;
    mail: string;
    phone: string;
}
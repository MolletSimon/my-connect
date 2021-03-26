import { Group } from './group';
export interface User {
    id: string;
    firstname: string;
    lastname: string;
    groups: Group[];
    isSuperAdmin: boolean;
}
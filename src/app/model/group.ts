export interface Group {
    _id: string;
    name: string;
    color: string;
    responsable: {
        id: string;
        firstname: string;
        lastname: string;
        phone: string;
        mail: string;
    };
}
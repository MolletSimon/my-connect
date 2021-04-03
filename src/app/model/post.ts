export interface Post {
    id: string;
    content: string;
    user: {
        id: string;
        firstname: string;
        lastname: string;
    };
    group: [{
        _id: string;
        name: string;
        color: string;
    }]
    date: Date;
}
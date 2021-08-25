import { Poll } from './poll';
export interface Post {
    _id: string;
    content: string;
    user: {
        id: string;
        firstname: string;
        lastname: string;
        img: string;
    };
    group: [{
        _id: string;
        name: string;
        color: string;
    }]
    date: Date;
    isPoll: boolean;
    poll: Poll;
    isPined: boolean;
    userLiked: boolean;
    liked: {
        _id: string;
        firstname: string;
        lastname: string;
    } []
}
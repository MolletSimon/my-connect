import { User } from "./user";

export interface Poll {
    content: string;
    answers: Array<{
        name: string,
        nbVote: number,
        id: number;
        usersWhoVoted: Array<User>
    }>;
    hasVoted: boolean;
    data: any[];
}
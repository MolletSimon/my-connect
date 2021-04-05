export interface Poll {
    content: string;
    answers: Array<{
        name: string,
        nbVote: number,
        id: number;
    }>
}
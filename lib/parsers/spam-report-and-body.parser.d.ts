export declare const spamHeaderAndBodyResponse: (a: string) => {
    spamReport: {
        isSpam: boolean;
        score: number;
        threshold: number;
    };
    body: string;
};

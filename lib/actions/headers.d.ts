/// <reference types="node" />
export declare const headers: (email: string) => (connection: import("net").Socket) => Promise<{
    spamReport: {
        isSpam: boolean;
        score: number;
        threshold: number;
    };
    body: string;
}>;

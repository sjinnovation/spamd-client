/// <reference types="node" />
export declare const symbols: (email: string) => (connection: import("net").Socket) => Promise<{
    body: string[];
    spamReport: {
        isSpam: boolean;
        score: number;
        threshold: number;
    };
}>;

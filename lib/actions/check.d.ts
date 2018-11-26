/// <reference types="node" />
export declare const check: (email: string) => (connection: import("net").Socket) => Promise<{
    isSpam: boolean;
    score: number;
    threshold: number;
}>;

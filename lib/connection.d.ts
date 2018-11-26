/// <reference types="node" />
import { Socket } from 'net';
declare type SpamdClientConfig = {
    host: string;
    port: number;
};
export declare const Connection: {
    of: (options: SpamdClientConfig) => () => Promise<Socket>;
};
export {};

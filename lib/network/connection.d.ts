/// <reference types="node" />
import { Socket } from 'net';
export declare type SpamdClientOptionsT = {
    host: string;
    port: number;
};
export declare const Connection: {
    of: (options: SpamdClientOptionsT) => () => Promise<Socket>;
};

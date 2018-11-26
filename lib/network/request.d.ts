/// <reference types="node" />
import { Socket } from 'net';
import { RequestT } from '../types';
export declare const exec: <RES_T>(requestBuilder: (req: RequestT) => RequestT, responseParser: (response: string) => RES_T) => (connection: Socket) => Promise<RES_T>;

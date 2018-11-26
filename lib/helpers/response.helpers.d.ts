import { ParserResultT } from '../types';
export declare const checkError: (result: ParserResultT) => ParserResultT;
export declare const getSpamHeader: (result: ParserResultT) => {
    isSpam: boolean;
    score: number;
    threshold: number;
};
export declare const getBody: (result: ParserResultT) => string;

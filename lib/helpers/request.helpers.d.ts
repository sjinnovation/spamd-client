import { Header, RequestT, Method } from '../types';
export declare const withMethod: (method: Method) => (req: RequestT) => RequestT;
export declare const withBody: (body: string) => (req: RequestT) => RequestT;
export declare const withHeader: (header: [Header, string | number]) => (req: RequestT) => RequestT;
export declare const withContentLength: (req: RequestT) => RequestT;

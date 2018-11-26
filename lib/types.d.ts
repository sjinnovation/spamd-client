export declare enum Header {
    Compress = "Compress",
    ContentLength = "Content-length",
    DidRemove = "DidRemove",
    DidSet = "DidSet",
    MessageClass = "Message-class",
    Remove = "Remove",
    Set = "Set",
    Spam = "Spam",
    User = "User"
}
export declare type HeaderRecord = [Header, string | number];
export declare enum StatusCode {
    EX_OK = 0,
    EX_USAGE = 64,
    EX_DATAERR = 65,
    EX_NOINPUT = 66,
    EX_NOUSER = 67,
    EX_NOHOST = 68,
    EX_UNAVAILABLE = 69,
    EX_SOFTWARE = 70,
    EX_OSERR = 71,
    EX_OSFILE = 72,
    EX_CANTCREAT = 73,
    EX_IOERR = 74,
    EX_TEMPFAIL = 75,
    EX_PROTOCOL = 76,
    EX_NOPERM = 77,
    EX_CONFIG = 78,
    EX_TIMEOUT = 79
}
export declare const ErrorMessage: {
    [StatusCode.EX_USAGE]: string;
    [StatusCode.EX_DATAERR]: string;
    [StatusCode.EX_NOINPUT]: string;
    [StatusCode.EX_NOUSER]: string;
    [StatusCode.EX_NOHOST]: string;
    [StatusCode.EX_UNAVAILABLE]: string;
    [StatusCode.EX_SOFTWARE]: string;
    [StatusCode.EX_OSERR]: string;
    [StatusCode.EX_OSFILE]: string;
    [StatusCode.EX_CANTCREAT]: string;
    [StatusCode.EX_IOERR]: string;
    [StatusCode.EX_TEMPFAIL]: string;
    [StatusCode.EX_PROTOCOL]: string;
    [StatusCode.EX_NOPERM]: string;
    [StatusCode.EX_CONFIG]: string;
    [StatusCode.EX_TIMEOUT]: string;
};
export declare const enum Method {
    CHECK = "CHECK",
    HEADERS = "HEADERS",
    PING = "PING",
    PROCESS = "PROCESS",
    REPORT = "REPORT",
    REPORT_IFSPAM = "REPORT_IFSPAM",
    SKIP = "SKIP",
    SYMBOLS = "SYMBOLS",
    TELL = "TELL"
}
export declare type RequestT = {
    method: Method;
    headers: HeaderRecord[];
    body: string;
};
export declare type ParserResultT = {
    protocol: string;
    version: string;
    statusCode: StatusCode;
    message: string;
    headers: HeaderRecord[];
    body?: string;
};

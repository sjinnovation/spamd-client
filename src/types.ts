export enum Header {
  Compress = 'Compress',
  ContentLength = 'Content-length',
  DidRemove = 'DidRemove',
  DidSet = 'DidSet',
  MessageClass = 'Message-class',
  Remove = 'Remove',
  Set = 'Set',
  Spam = 'Spam',
  User = 'User',
}

export type HeaderRecord = [Header, string | number]

export enum StatusCode {
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
  EX_TIMEOUT = 79,
}

export const ErrorMessage = {
  [StatusCode.EX_USAGE]: 'Command line usage error',
  [StatusCode.EX_DATAERR]: 'Data format error',
  [StatusCode.EX_NOINPUT]: 'Cannot open input',
  [StatusCode.EX_NOUSER]: 'Addressee unknown',
  [StatusCode.EX_NOHOST]: 'Hostname unknown.',
  [StatusCode.EX_UNAVAILABLE]: 'Service unavailable',
  [StatusCode.EX_SOFTWARE]: 'Internal software error',
  [StatusCode.EX_OSERR]: 'System error',
  [StatusCode.EX_OSFILE]: 'Critical operating system file missing',
  [StatusCode.EX_CANTCREAT]: 'Can’t create user output file',
  [StatusCode.EX_IOERR]: 'Input/output error',
  [StatusCode.EX_TEMPFAIL]: 'Temporary failure',
  [StatusCode.EX_PROTOCOL]: 'Remote error in protocol',
  [StatusCode.EX_NOPERM]: 'Permission denied',
  [StatusCode.EX_CONFIG]: 'Configuration error',
  [StatusCode.EX_TIMEOUT]: 'Read timeout',
}

export const enum Method {
  CHECK = 'CHECK',
  HEADERS = 'HEADERS',
  PING = 'PING',
  PROCESS = 'PROCESS',
  REPORT = 'REPORT',
  REPORT_IFSPAM = 'REPORT_IFSPAM',
  SKIP = 'SKIP',
  SYMBOLS = 'SYMBOLS',
  TELL = 'TELL',
}

export type RequestT = {
  method: Method
  headers: HeaderRecord[]
  body: string
}

export type ParserResultT = {
  protocol: string;
  version: string;
  statusCode: StatusCode;
  message: string;
  headers: HeaderRecord[];
  body?: string;
}

import { Header } from './header'

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
  EX_TIMEOUT = 79
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

type RequestT<M, H, B> = {
  method: M,
  headers: H,
  body: B
}

type ResponseT<H, B> = {
  headers: H,
  body: B,
  status: StatusCode
}

type SpamCheckRequestHeadersT =
  | [Header.ContentLength]
  | [Header.User, Header.ContentLength]
  | [Header.Compress, Header.ContentLength]
  | [Header.Compress, Header.User, Header.ContentLength]

type TellRequestHeadersT =
  | [Header.User, Header.MessageClass, Header.Remove, Header.ContentLength]
  | [Header.User, Header.MessageClass, Header.Set, Header.ContentLength]
  | [Header.User, Header.MessageClass, Header.Remove, Header.Set, Header.ContentLength]
  | [Header.User, Header.MessageClass, Header.Remove, Header.Compress, Header.ContentLength]
  | [Header.User, Header.MessageClass, Header.Set, Header.Compress, Header.ContentLength]
  | [Header.User, Header.MessageClass, Header.Remove, Header.Set, Header.Compress, Header.ContentLength]

type TellResponseHeadersT =
  | [Header.DidSet, Header.ContentLength]
  | [Header.DidRemove, Header.ContentLength]
  | [Header.DidSet, Header.DidRemove, Header.ContentLength]

type SpamCheckRequestT<M> = RequestT<M, SpamCheckRequestHeadersT, string>
type SpamCheckResponseT = ResponseT<[Header.Spam, Header.ContentLength], string>

export type CheckRequestT = SpamCheckRequestT<Method.CHECK>
export type CheckResponseT = ResponseT<[Header.Spam], never>

export type HeadersRequestT = SpamCheckRequestT<Method.HEADERS>
export type HeadersResponseT = SpamCheckResponseT

export type PingRequestT = RequestT<Method.PING, never, never>
export type PingResponseT = ResponseT<never, never>

export type ProcessRequestT = SpamCheckRequestT<Method.PROCESS>
export type ProcessResponseT = SpamCheckResponseT

export type ReportRequestT = SpamCheckRequestT<Method.REPORT>
export type ReportResponseT = SpamCheckResponseT

export type ReportIfSpamRequestT = SpamCheckRequestT<Method.REPORT_IFSPAM>
export type ReportIfSpamResponseT = ReportResponseT | ResponseT<never, never>

export type SymbolsRequestT = SpamCheckRequestT<Method.SYMBOLS>
export type SymbolsResponseT = SpamCheckResponseT


export type TellRequestT = RequestT<Method.TELL, TellRequestHeadersT, string>
export type TellResponseT = ResponseT<TellResponseHeadersT, never>


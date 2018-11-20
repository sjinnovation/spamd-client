import { Header } from '../header'
import { Socket } from 'net'

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

export type RequestT<M, H, B> = {
  method: M
  headers: H
  body: B
}

export type ResponseT<H, B> = {
  headers: H
  body: B
  status: StatusCode
}

const makeRequest = <REQ_T, RES_T>(
  requestBuilder: (req: REQ_T) => string,
  responseParser: (response: string) => RES_T,
  req: REQ_T,
  connection: Socket,
): Promise<RES_T> => {
  return new Promise((resolve, reject) => {

  })
}

import { Header, HeaderRecordT, RequestT, Method } from '../types'

export const withMethod = (method: Method) => (
  req: RequestT
): RequestT => ({
  ...req,
  method,
})

export const withBody = (body: string) => (
  req: RequestT
): RequestT => ({
  ...req,
  body: body + '\r\n',
})

export const withHeader = (header: HeaderRecordT) => (
  req: RequestT
): RequestT => ({
  ...req,
  headers: [...req.headers, header],
})

export const withContentLength = (req: RequestT): RequestT => {
  if (!req.body) {
    return req
  }

  return {
    ...req,
    headers: [
      ...req.headers,
      [Header.ContentLength, req.body.length],
    ],
  }
}

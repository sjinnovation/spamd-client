import { Header, HeaderRecord, RequestT, Method } from '../types'

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
  body,
})

export const withHeader = (header: HeaderRecord) => (
  req: RequestT
): RequestT => ({
  ...req,
  headers: [...req.headers, header],
})

export const withContentLength = (req: RequestT): RequestT => ({
  ...req,
  headers: [...req.headers, [Header.ContentLength, req.body.length]],
})

import { Header } from './header'
import { RequestT, Method } from './request/base.request'

export namespace Builder {
  type RequestToBuildT = RequestT<Method, Header.RequestHeaderT[], string>

  type Arity<A, B> = (a: A) => B

  export function chain<A, B>(f: Arity<A, B>): Arity<A, B>
  export function chain<A, B, C>(
    g: Arity<A, B>,
    f: Arity<B, C>
  ): Arity<A, C>
  export function chain<A, B, C, D>(
    h: Arity<A, B>,
    g: Arity<B, C>,
    f: Arity<C, D>
  ): Arity<A, D>
  export function chain<A, B, C, D, E>(
    i: Arity<A, B>,
    h: Arity<B, C>,
    g: Arity<C, D>,
    f: Arity<D, E>
  ): Arity<A, E>
  export function chain<A, B, C, D, E, F>(
    j: Arity<A, B>,
    i: Arity<B, C>,
    h: Arity<C, D>,
    g: Arity<D, E>,
    f: Arity<E, F>
  ): Arity<A, F>

  export function chain(...fns: Arity<any, any>[]) {
    return fns.reduce(
      (prevFn, nextFn) => value => nextFn(prevFn(value)),
      value => value
    )
  }

  // export const of = () => {
  //   return
  // }

  export const withMethod = (method: Method) => (
    req: RequestToBuildT
  ): RequestToBuildT => ({
    ...req,
    method,
  })

  export const withBody = (body: string) => (
    req: RequestToBuildT
  ): RequestToBuildT => ({
    ...req,
    body,
  })

  export const withHeader = (header: Header.RequestHeaderT) => (
    req: RequestToBuildT
  ): RequestToBuildT => ({
    ...req,
    headers: [...req.headers, header],
  })

  export const withContentLength = (
    req: RequestToBuildT
  ): RequestToBuildT => ({
    ...req,
    headers: [
      ...req.headers,
      [Header.Name.ContentLength, req.body.length],
    ],
  })

  export const toString = (req: RequestToBuildT) =>
    `${req.method} SPAMC/1.5\r\n` +
    req.headers.map(([name, value]) => `${name}: ${value}\r\n`).join('') +
    '\n\r' +
    req.body
}

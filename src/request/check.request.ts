import { Header } from '../header'
import { parse } from '../parser'

import {
  SpamCheckRequestT,
  ResponseT,
  Method,
  makeRequest,
} from './base.request'
import { Builder } from '../builder'

type CheckRequestT = SpamCheckRequestT<Method>
type CheckResponseT = any

// const builder = Builder.chain(
//   Builder.withMethod(Method.CHECK),
//   Builder.withContentLength
// )

// const formatSpamHeader = ()

export const checkRequest = (body: string) => makeRequest<CheckResponseT>(Builder.chain(
  Builder.withMethod(Method.CHECK),
  Builder.withBody(body),
  Builder.withContentLength,
), Builder.chain(
  parse,
  (response) => response
))

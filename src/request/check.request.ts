import { Header } from '../header'
import {
  SpamCheckRequestT,
  ResponseT,
  Method,
  makeRequest,
} from './base.request'
import { Builder } from '../builder'

type CheckRequestT = SpamCheckRequestT<Method>
type CheckResponseT = any

const builder = Builder.chain(
  Builder.withMethod(Method.CHECK),
  Builder.withContentLength
)

// const formatSpamHeader = ()

const checkRequest = makeRequest<CheckResponseT>(builder, res => ({}))

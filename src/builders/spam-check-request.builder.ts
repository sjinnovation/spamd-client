import { Method } from '../types'
import { pipe } from '../helpers/common.helpers'
import {
  withMethod,
  withBody,
  withContentLength,
} from '../helpers/request.helpers'

export const emailSpamCheckRequest = (
  method: Method,
  email: string
) => pipe(withMethod(method), withBody(email), withContentLength)

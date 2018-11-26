import { Response } from '../network'
import { pipe, ap } from '../helpers/common.helpers'
import {
  checkError,
  getSpamHeader,
  getBody,
} from '../helpers/response.helpers'

export const spamHeaderAndBodyResponse = pipe(
  Response.parse,
  checkError,
  ap(getSpamHeader, getBody),
  ([spamReport, body]) => ({ spamReport, body })
)

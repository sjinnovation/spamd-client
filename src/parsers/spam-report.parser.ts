import { Response } from '../network'
import { pipe } from '../helpers/common.helpers'
import { checkError, getSpamHeader } from '../helpers/response.helpers'

export const spamHeaderResponse = pipe(Response.parse, checkError, getSpamHeader)

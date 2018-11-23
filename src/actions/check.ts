import { Method } from '../types'
import { Builder, Response, Request } from '../request'
import { checkError, getSpamHeader, pipe } from '../helpers'

export const check = (email: string) =>
  Request.exec(
    pipe(
      Builder.withMethod(Method.CHECK),
      Builder.withBody(email),
      Builder.withContentLength,
    ),
    pipe(Response.parse, checkError, getSpamHeader),
  )

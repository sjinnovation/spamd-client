import { Method } from '../types'
import { Request } from '../network'
import { emailSpamCheckRequest } from '../builders'
import { spamHeaderAndBodyResponse } from '../parsers'

/**
 * Process the included message and return only the modified headers.
 *
 * @param email - An email based on the RFC 5322 standard.
 * @returns Spam report and the modified headers of the message in the body.
 */
export const headers = (email: string) =>
  Request.exec(
    emailSpamCheckRequest(Method.HEADERS, email),
    spamHeaderAndBodyResponse
  )

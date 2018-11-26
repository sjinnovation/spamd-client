import { Method } from '../types'
import { Request } from '../network'
import { emailSpamCheckRequest } from '../builders'
import { spamHeaderResponse } from '../parsers'

/**
 * Instruct SpamAssassin to process the included message.
 *
 * @param email - An email based on the RFC 5322 standard.
 * @returns Spam report
 */
export const check = (email: string) =>
  Request.exec(
    emailSpamCheckRequest(Method.CHECK, email),
    spamHeaderResponse
  )

import { Method } from '../types'
import { Request } from '../network'
import { emailSpamCheckRequest } from '../builders'
import { spamHeaderAndBodyResponse } from '../parsers'

/**
 * Instruct SpamAssassin to process the message and return the rules that were matched.
 *
 * @param email - An email based on the RFC 5322 standard.
 * @returns Spam report and the body contains the SpamAssassin rules that were matched.
 */
export const process = (email: string) =>
  Request.exec(
    emailSpamCheckRequest(Method.SYMBOLS, email),
    spamHeaderAndBodyResponse
  )

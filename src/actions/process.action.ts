import { Method } from '../types'
import { Request } from '../network'
import { emailSpamCheckRequest } from '../builders'
import { spamHeaderAndBodyResponse } from '../parsers'

/**
 * Instruct SpamAssassin to process the message and return the modified message.
 *
 * @param email - An email based on the RFC 5322 standard.
 * @returns Spam report and a modified message in the body.
 */
export const process = (email: string) =>
  Request.exec(
    emailSpamCheckRequest(Method.PROCESS, email),
    spamHeaderAndBodyResponse
  )

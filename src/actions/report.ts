import { Method } from '../types'
import { Request } from '../network'
import { emailSpamCheckRequest } from '../builders'
import { spamHeaderAndBodyResponse } from '../parsers'

/**
 * Send a request to process a message and return a report.
 *
 * @param email - An email based on the RFC 5322 standard.
 * @returns Spam report and the body containing a report of the message scanned.
 */
export const process = (email: string) =>
  Request.exec(
    emailSpamCheckRequest(Method.REPORT, email),
    spamHeaderAndBodyResponse
  )

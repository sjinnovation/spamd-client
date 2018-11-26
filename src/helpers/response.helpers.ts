import {
  Header,
  ParserResultT,
  StatusCode,
  ErrorMessage,
} from '../types'

export const checkError = (result: ParserResultT) => {
  if (result.statusCode !== StatusCode.EX_OK) {
    throw new Error(
      `${StatusCode[result.statusCode]}: ${
        ErrorMessage[result.statusCode]
      }`
    )
  }
  return result
}

export const getSpamHeader = (result: ParserResultT) => {
  const report = result.headers.find(([name]) => name === Header.Spam)
  if (!report) {
    throw new Error('Spam header not found in response')
  }

  const [_, spamReport] = report
  return (<any>spamReport) as {
    isSpam: boolean
    score: number
    threshold: number
  }
}

export const getBody = (result: ParserResultT) => result.body || ''

// import fn from 'lodash.curry'
// import { createConnection, Socket } from 'net'
// import { of } from 'fluture'
// import * as Builder from './utils/request-builder'
// import { readFileSync } from 'fs'
// import { connect } from './connection'

// type ServerConfig = {
//   host: string
//   port?: number
//   options?: {
//     compression?: boolean
//     poolSize?: number
//   }
// }

// type SpamdConnect = {
//   instance: Socket
//   options: {
//     compression?: boolean
//   }
// }

// const makeRequest = (
//   request: Builder.Request,
//   connection: SpamdConnect
// ) => {
//   const reqWithOptions = connection.options.compression
//     ? Builder.withHeader(['Compress', 'zlib'], request)
//     : request

//   connection.instance.write(Builder.toRaw(reqWithOptions))
// }

// export const check = fn((email: string, connection: SpamdConnect) =>
//   makeRequest(
//     Builder.withBody(email, Builder.initRequest('REPORT')),
//     connection
//   )
// )

// export const headers = (email: any, connection: SpamdConnect) => {
//   return of(1)
// }

// const email = readFileSync(__dirname + '/../original_msg.txt').toString(
//   'utf-8'
// )
// // check(
// //   email,
// connect({
//   host: '52.27.15.194',
//   port: 3533,
//   options: {
//     compression: false,
//     poolSize: 6
//   },
// })
// // )

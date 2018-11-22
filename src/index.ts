import { SpamdConnect } from './connection'
import { checkRequest } from './request/check.request'
import { readFileSync } from 'fs'

SpamdConnect.of({
  host: '54.202.183.103',
  port: 3533,
  compression: false,
  poolSize: 6
})
  .use(checkRequest(readFileSync(__dirname + '/../msg.txt').toString()))
  .then(result => console.log(JSON.stringify(result, null, 2)))
  .catch(console.error)

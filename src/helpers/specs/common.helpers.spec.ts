import { pipe, ap } from '../common.helpers'

describe('#pipe', () => {
  test('works correctly with more than 2 functions', () => {
    // given
    const add = (a: number) => (b: number) => b + a
    const substract = (a: number) => (b: number) => b - a
    const multiply = (a: number) => (b: number) => b * a

    // when
    const result = pipe(add(1), substract(2), multiply(2))(10)

    // then
    expect(result).toEqual(18)
  })

  test('works correctly with 1 function', () => {
    // given
    const add = (a: number) => (b: number) => b + a

    // when
    const result = pipe(add(1))(10)

    // then
    expect(result).toEqual(11)
  })
})

describe('#ap', () => {
  test('works correctly with more than 2 functions', () => {
    // given
    const user = {
      firstName: 'Ivo',
      lastName: 'Bobul',
      age: '65',
      sex: 'male',
    }
    const prop = (name: string) => (obj: { [key: string]: string }) =>
      obj[name]

    // when
    const result = ap(
      prop('age'),
      prop('lastName'),
      prop('firstName')
    )(user)

    // then
    expect(result).toEqual(['65', 'Bobul', 'Ivo'])
  })

  test('works correctly with 1 function', () => {
    // given
    const user = {
      firstName: 'Ivo',
      lastName: 'Bobul',
      age: '65',
      sex: 'male',
    }
    const prop = (name: string) => (obj: { [key: string]: string }) =>
      obj[name]

    // when
    const result = ap(prop('age'))(user)

    // then
    expect(result).toEqual(['65'])
  })
})

import { pipe, ap, splitListByElement } from '../common.helpers'

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

describe('#splitListByElement', () => {
  test('works correctly in list without needle element', () => {
    // given
    const list = ['s', 'u', 'r', 'p', 'r', 'i', 's', 'e']

    // when
    const result = splitListByElement('a', list)

    // then
    expect(result).toEqual([list])
  })

  test('works correctly with 1 needle element', () => {
    // given
    const list = ['s', 'p', 'a', 'm']

    // when
    const result = splitListByElement('a', list)

    // then
    expect(result).toEqual([['s', 'p'], ['m']])
  })

  test('works correctly with more than 2 needle elements', () => {
    // given
    const list = [
      's',
      'p',
      'a',
      'm',
      'a',
      's',
      's',
      'a',
      's',
      's',
      'i',
      'n',
    ]

    // when
    const result = splitListByElement('a', list)

    // then
    expect(result).toEqual([
      ['s', 'p'],
      ['m'],
      ['s', 's'],
      ['s', 's', 'i', 'n'],
    ])
  })

  test('works correctly with needle element in the end', () => {
    // given
    const list = ['h', 'o', 'h', 'm', 'a']

    // when
    const result = splitListByElement('a', list)

    // then
    expect(result).toEqual([['h', 'o', 'h', 'm']])
  })

  test('works correctly with needle element from the start', () => {
    // given
    const list = ['a', 'c', 't', 'i', 'o', 'n']

    // when
    const result = splitListByElement('a', list)

    // then
    expect(result).toEqual([['c', 't', 'i', 'o', 'n']])
  })
})

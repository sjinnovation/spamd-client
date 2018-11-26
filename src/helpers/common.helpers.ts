type Arity<A, B> = (a: A) => B

export const splitListByElement = <T>(splitter: T, list: T[]) => {
  return list.reduce(
    (result, element) => {
      if (element === splitter) {
        return [...result, []]
      }

      const lastGroup = result[result.length - 1]
      const expectLast = result.slice(0, result.length - 1)
      return [...expectLast, [...lastGroup, element]]
    },
    [[]] as T[][],
  )
}

export function ap<T, R1, R2>(
  ...fns: [Arity<T, R1>, Arity<T, R2>]
): (applicable: T) => [R1, R2]

export function ap<T, R1, R2, R3>(
  ...fns: [Arity<T, R1>, Arity<T, R2>, Arity<T, R3>]
): (applicable: T) => [R1, R2, R3]

export function ap<T, R1, R2, R3, R4>(
  ...fns: [Arity<T, R1>, Arity<T, R2>, Arity<T, R3>, Arity<T, R4>]
): (applicable: T) => [R1, R2, R3, R4]

export function ap<T, R1, R2, R3, R4, R5>(
  ...fns: [Arity<T, R1>, Arity<T, R2>, Arity<T, R3>, Arity<T, R4>, Arity<T, R5>]
): (applicable: T) => [R1, R2, R3, R4, R5]

export function ap<T, R1, R2, R3, R4, R5, R6>(
  ...fns: [
    Arity<T, R1>,
    Arity<T, R2>,
    Arity<T, R3>,
    Arity<T, R4>,
    Arity<T, R5>,
    Arity<T, R6>
  ]
): (applicable: T) => [R1, R2, R3, R4, R5, R6]
export function ap(...fns: Arity<any, any>[]) {
  return (applicable: any) => fns.map(fn => fn(applicable))
}

export function pipe<A, B>(f: Arity<A, B>): Arity<A, B>
export function pipe<A, B, C>(g: Arity<A, B>, f: Arity<B, C>): Arity<A, C>
export function pipe<A, B, C, D>(
  h: Arity<A, B>,
  g: Arity<B, C>,
  f: Arity<C, D>,
): Arity<A, D>
export function pipe<A, B, C, D, E>(
  i: Arity<A, B>,
  h: Arity<B, C>,
  g: Arity<C, D>,
  f: Arity<D, E>,
): Arity<A, E>
export function pipe<A, B, C, D, E, F>(
  j: Arity<A, B>,
  i: Arity<B, C>,
  h: Arity<C, D>,
  g: Arity<D, E>,
  f: Arity<E, F>,
): Arity<A, F>

export function pipe(...fns: Arity<any, any>[]) {
  return fns.reduce(
    (prevFn, nextFn) => value => nextFn(prevFn(value)),
    value => value,
  )
}

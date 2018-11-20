
export namespace Header {
  type Destination = 'local' | 'remote' | 'both'
  type HeaderRecord<N, V> = [N, V]

  export enum Name {
    Compress = "Compress",
    ContentLength = "Content-length",
    DidRemove = "DidRemove",
    DidSet = "DidSet",
    MessageClass = "Message-class",
    Remove = "Remove",
    Set = "Set",
    Spam = "Spam",
    User = "User"
  }

  export type Compress = HeaderRecord<Name.Compress, 'zlib'>
  export type ContentLength = HeaderRecord<Name.ContentLength, number>
  export type DidRemove = HeaderRecord<Name.DidRemove, Destination>
  export type DidSet = HeaderRecord<Name.DidSet, Destination>
  export type MessageClass = HeaderRecord<Name.MessageClass, Destination>
  export type Remove = HeaderRecord<Name.Remove, Destination>
  export type Set = HeaderRecord<Name.Set, Destination>
  export type Spam = HeaderRecord<Name.Spam, { isSpam: boolean, score: number, threshold: number }>
  export type User = HeaderRecord<Name.User, string>
}

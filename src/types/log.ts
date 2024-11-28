export interface Log {
  eventName: string
  args: {
    from?: string
    to?: string
    tokenId: string
  }
}

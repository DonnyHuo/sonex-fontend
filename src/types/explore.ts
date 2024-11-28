import { Data, Meta, Take } from '@/types/common'

export interface TokensParams extends Take {
  order: 'ASC' | 'DESC'
  token?: string
  poolAddress?: string
}

export interface TokensDataHourVolume {
  feesUSD: string
  id: string
  isNegative: boolean
  periodStartUnix: string
  ratio: string
  totalValueLocked: string
  volume: string
  volumeUSD: string
}
export interface TokensDataDayVolume {
  date: string
  feesUSD: string
  id: string
  isNegative: boolean
  priceUSD: string
  ratio: string
  totalValueLocked: string
  totalValueLockedUSD: string
  volume: string
  volumeUSD: string
}
export interface TokensDataItemKline {
  close: string
  high: string
  low: string
  open: string
  timestamp: number
}
export interface TokensDataItem {
  id: string
  address: string
  logo: string
  name: string
  symbol: string
  decimals: number
  priceHistory: string[]
  hourVolume: TokensDataHourVolume
  dayVolume: TokensDataDayVolume
  kline: TokensDataItemKline[]
  volume: string
  index?: number
  fdv: string
}
export interface TokensResponse extends Data {
  data: TokensDataItem[]
  meta: Meta
}

export interface TokensTopDataItemPools {
  address: string
  decimals: number
  logo: string
  name: string
  symbol: string
}
export interface TokensTopDataPoolsItem {
  address: string
  feeTier: number
  liquidity: string
  token0: TokensTopDataItemPools
  token1: TokensTopDataItemPools
}
export interface TokensTopDataItem {
  address: string
  decimals: number
  logo: string
  name: string
  symbol: string
  pools: TokensTopDataPoolsItem[]
  index?: number
}
export interface TokensTopResponse extends Data {
  tokens: TokensTopDataItem[]
}

export interface TransactionsDataItemToken {
  address: string
  decimals: number
  logo: string
  name: string
  symbol: string
}
export interface TransactionsDataItem {
  createdAt: string
  address: string
  amount0: string
  amount1: string
  hash: string
  id: string
  pool: TransactionsDataItemPool
  token0: TransactionsDataItemToken
  token1: TransactionsDataItemToken
}
export interface TransactionsDataItemPool {
  address: string
  feeTier: number
  liquidity: string
  token0: TransactionsDataItemToken
  token1: TransactionsDataItemToken
}
export interface TransactionsResponse extends Data {
  data: TransactionsDataItem[]
  meta: Meta
}

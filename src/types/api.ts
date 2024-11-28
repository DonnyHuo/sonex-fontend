import { Meta } from './common'

export type ApiResponse = {
  statusCode: number
  message?: string
}

export interface ApiBaseTokenInfo {
  id: string
  address: string
  name: string
  symbol: string
  decimals: number
}

export interface TokenInfo extends ApiBaseTokenInfo {
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  logo: string | null
  sort: number
}

export interface ApiTokenListResponse extends ApiResponse {
  data: Array<
    {
      tag: Array<string>
      pools: Array<{
        address: string
        feeTier: number
        liquidity: string
        token0: ApiBaseTokenInfo
        token1: ApiBaseTokenInfo
      }>
    } & Partial<TokenInfo>
  >
}

export interface ApiTopTokenListResponse extends ApiResponse {
  tokens: Array<Partial<TokenInfo>>
}

export interface ApiTokenPairsResponse extends ApiResponse {
  tokenPairs: Array<{
    address: string
    symbol: string
    name: string
    decimals: number
    logo: string
    pairs: Array<TokenInfo>
  }>
}

export interface ApiQuoteRoute {
  token0: string
  token1: string
  fee: number
  liquidity: string
  currentTick: number
  sqrtPrice: string
  poolAddress: string
  token0Info: ApiBaseTokenInfo
  token1Info: ApiBaseTokenInfo
}

export interface ApiQuoteParams {
  tokenIn: string
  tokenOut: string
  quoteAmount: string
}

export interface ApiQuoteResponse extends ApiResponse {
  bestRoutes: {
    route: Array<ApiQuoteRoute>
    quote: string
    gasLimit: string
    priceAfter: string
    priceImpact: string
  }
  allRoutes: Array<{
    route: Array<ApiQuoteRoute>
    quote: string
    gasLimit: string
    priceAfter: string
    priceImpact: string
  }>
}

export interface ApiTokenKlineParams {
  address: string
  interval: '1h' | '1d' | '7d' | '30d' | '1w' | '1m' | '1y'
}

export interface ApiTokenKlineResponse extends ApiResponse {
  data: Array<{
    timestamp: number
    open: string
    high: string
    low: string
    close: string
  }>
}

export interface ApiTokenInfoParams {
  address: string
}

export interface ApiTokenInfoResponse extends ApiResponse {
  token: TokenInfo & {
    additional: {
      social: {
        twitter: string
        reddit: string
        github: string
        discord: string
        telegram: string
        bitclout: string
      }
      website: string
      description: string
      whitepaper: string
      audits: string
    }
  }
}

export interface ApiTokenPriceParams {
  address: string
}

export interface ApiTokenPriceResponse extends ApiResponse {
  price: string
}

export interface PoolItem {
  id: string
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
  address: string
  feesUSD: string
  feeTier: number
  sqrtPrice: string
  token0Price: string
  token1Price: string
  volumeUSD: string
  volumeToken1: string
  volumeToken0: string
  totalValueLockedToken0: string
  totalValueLockedToken1: string
  createdAtTimestamp: number
  liquidity: string
  sort: number
  recommendOrder: number
  isHidden: boolean
  isOpen: boolean
  token0: TokenInfo
  token1: TokenInfo
}

export interface ApiTokenPoolsParams {
  address: string
}

export interface ApiTokenPoolsResponse extends ApiResponse {
  data: PoolItem[]
}

export interface TransactionRecordItem {
  id: string
  address: string
  token0: TokenInfo
  token1: TokenInfo
  pool: Pick<
    PoolItem,
    | 'address'
    | 'feeTier'
    | 'liquidity'
    | 'token0'
    | 'token1'
    | 'token0Price'
    | 'token1Price'
  >
  hash: string
  amount0: number
  amount1: number
  createdAt: string
}

export interface ApiTokenTransactionsParams {
  token: string
  order?: 'ASC' | 'DESC'
  page?: number
  take?: number
}

export interface ApiTokenTransactionsResponse extends ApiResponse {
  data: TransactionRecordItem[]
  meta: Meta
}

export interface ApiPoolInfoParams {
  address: string
}

export interface PoolInfo {
  address: string
  token0: TokenInfo
  token1: TokenInfo
  token0Price: string
  token1Price: string
  feeTier: number
  liquidity: string
  volumeToken1: string
  volumeToken0: string
  tvlUSD: string
  tvlRatio: number
  isTvlNegative: boolean
  vol24h: number
  vol24hRatio: number
  isVol24hNegative: boolean
  fee24h: number
}

export interface ApiPoolInfoResponse extends ApiResponse, PoolInfo {}

export interface ApiPoolSwapStatsParams {
  address: string
  interval: '1h' | '1d' | '7d' | '30d' | '1w' | '1m' | '1y'
}

export interface ApiPoolSwapStatsResponse extends ApiResponse {
  stats: Array<{
    timestamp: number
    amount: number
    amountPrice: number
  }>
}

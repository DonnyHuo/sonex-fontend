import { Address } from 'viem'

import { Data, Meta, Take } from '@/types/common'

export interface PoolsParams extends Take {
  order: 'ASC' | 'DESC'
  page: number
  take: number
  keywords?: string
  token0Address?: string
  token1Address?: string
}

export interface PoolsDataItemToken {
  address: string
  decimals: number
  logo: string
  name: string
  symbol: string
}
export interface PoolsDataItemVolume {
  date: string
  id: string
  token0Price: string
  token1Price: string
  tvlUSD: string
  volume: string
  volumeUSD: string
}

export interface PoolsParamsByAddress {
  keywords?: string
  token0Address?: string
  token1Address?: string
}
export interface PoolsDataItemVolume {
  date: string
  id: string
  token0Price: string
  token1Price: string
  tvlUSD: string
  volume: string
  volumeUSD: string
}
export interface PoolsDataItem {
  address: string
  feeTier: number
  liquidity: string
  tvlUSD: string
  token0: PoolsDataItemToken
  token1: PoolsDataItemToken
  volume: PoolsDataItemVolume | null
}
export interface PoolsResponse extends Data {
  data: PoolsDataItem[]
  meta: Meta
}
export interface PoolsAddressResponse extends Data {
  liquidities: PoolsDataItem[]
}

export interface PoolsTopDataItemToken {
  address: string
  decimals: number
  logo: string
  name: string
  symbol: string
}
export interface PoolsTopDataItemVolume {
  date: string
  id: string
  token0Price: string
  token1Price: string
  tvlUSD: string
  volume: string
  volumeUSD: string
}
export interface PoolsTopDataItem {
  address: string
  feeTier: number
  liquidity: string
  token0: PoolsTopDataItemToken
  token1: PoolsTopDataItemToken
  volume: PoolsTopDataItemVolume
}
export interface PoolsTopResponse extends Data {
  pools: PoolsTopDataItem[]
}

export type PoolsPositionsInterval = '1d' | '7d' | '30d' | '1y'

export interface PoolsPositionsParams {
  interval: PoolsPositionsInterval
  address?: Address
}

export interface PoolsPositionsDataItem {
  timestamp: number
  amountPrice: number
  tickLower: string
  tickUpper: string
  item: PoolsPositionsDataItem
}

export interface PoolsPositionsResponse extends Data {
  positions: PoolsPositionsDataItem[]
  gasCosts: number
  totalFees: number
  pnl30d: number
  pnl: number
  ratio: number
  isNegative: boolean
}

export interface PoolsPositionBalanceParams {
  id: string
  interval: PoolsPositionsInterval
  address?: Address
}

export interface PoolsPositionBalanceResponse extends Data {
  positions: PoolsPositionsDataItem[]
}

export interface PoolsUsdtResponse extends Data {
  data: {
    token0: {
      address: string
      symbol: string
    }
    pools: string[]
  }[]
}

export interface PoolsMyPositionsResponse extends Data {
  positions: {
    id: string
    tokenId: number
    balance: string
    claimableFees: number
    pnl30d: number
    pnl: number
    tickUpper: string
    tickLower: string
    ratio: number
    isNegative: boolean
    pool: {
      address: string
      feeTier: number
      liquidity: string
      tick: string
      token0: {
        address: string
        symbol: string
        name: string
        decimals: number
        logo: string
        additional: {
          twitter: string
          website: string
          description: string
        }
      }
      token1: {
        address: string
        symbol: string
        name: string
        decimals: number
        logo: string
        additional: {
          twitter: string
          website: string
          description: string
        }
      }
      token0Price: string
      token1Price: string
      volume: null
    }
  }[]
}

export type PoolsPositionByIdResponse = Data & {
  statusCode: number
  amount0: string
  amount1: string
  amountPrice0: string
  amountPrice1: string
  burnAmount0: string
  burnAmount1: string
  burnAmount0Price: string
  burnAmount1Price: string
  tickUpper: string
  tickLower: string
  nftId: number
  origin: string
  owner: string
  pnl30d: string
  isNegative: boolean
  ratio: string
  fee: number
  uncollectedFees: number
  token0: string
  token1: string
  pool: {
    address: string
    feeTier: number
    liquidity: string
    tick: string
    token0: {
      address: string
      symbol: string
      name: string
      decimals: number
      logo: string
      additional: {
        twitter: string
        website: string
        description: string
      }
    }
    token1: {
      address: string
      symbol: string
      name: string
      decimals: number
      logo: string
      additional: {
        twitter: string
        website: string
        description: string
      }
    }
    token0Price: string
    token1Price: string
    volume: null
  }
  positionAge: number
  invested: {
    investedAmount0: string
    investedAmount1: string
  }
  withdrawn: {
    withdrawnAmount0: string
    withdrawnAmount1: string
  }
  fees: {
    feeAmount0: string
    feeAmount1: string
  }
}

export interface PoolsPositionRangeResponse extends Data {
  positionRanges: PoolsPositionsDataItem[]
}

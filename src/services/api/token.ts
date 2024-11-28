import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import client from '../axios/client'

import {
  ApiTokenInfoParams,
  ApiTokenInfoResponse,
  ApiTokenKlineParams,
  ApiTokenKlineResponse,
  ApiTokenPoolsParams,
  ApiTokenPoolsResponse,
  ApiTokenPriceParams,
  ApiTokenPriceResponse,
  ApiTokenTransactionsParams,
  ApiTokenTransactionsResponse,
} from '@/types/api'

export const getTokenKline = async (params: ApiTokenKlineParams) => {
  const { data } = await client.get(
    `/tokens/kline?address=${params.address}&interval=${params.interval}`
  )
  return data
}

export const useGetTokenKline = (
  params: ApiTokenKlineParams,
  options?: Partial<UseQueryOptions<ApiTokenKlineResponse>>
) => {
  return useQuery<ApiTokenKlineResponse>({
    queryKey: ['/tokens/kline', params.address, params.interval],
    queryFn: () => getTokenKline(params),
    ...options,
  })
}

export const getTokenInfo = async (params: ApiTokenInfoParams) => {
  const { data } = await client.get(`/tokens/${params.address}/info`)
  return data
}

export const useGetTokenInfo = (
  params: ApiTokenInfoParams,
  options?: Partial<UseQueryOptions<ApiTokenInfoResponse>>
) => {
  return useQuery<ApiTokenInfoResponse>({
    queryKey: ['/tokens/info', params.address],
    queryFn: () => getTokenInfo(params),
    ...options,
  })
}

export const getTokenPrice = async (params: ApiTokenPriceParams) => {
  const { data } = await client.get(`/tokens/price?address=${params.address}`)
  return data
}

export const useGetTokenPrice = (
  params: ApiTokenPriceParams,
  options?: Partial<UseQueryOptions<ApiTokenPriceResponse>>
) => {
  return useQuery<ApiTokenPriceResponse>({
    queryKey: ['/tokens/price', params.address],
    queryFn: () => getTokenPrice(params),
    ...options,
  })
}

export const getTokenPools = async (params: ApiTokenPoolsParams) => {
  const { data } = await client.get(`/tokens/${params.address}/pools`)
  return data
}

export const useGetTokenPools = (
  params: ApiTokenPoolsParams,
  options?: Partial<UseQueryOptions<ApiTokenPoolsResponse>>
) => {
  return useQuery<ApiTokenPoolsResponse>({
    queryKey: ['/tokens/pools', params.address],
    queryFn: () => getTokenPools(params),
    ...options,
  })
}

export const getTokenTransactions = async (
  params: ApiTokenTransactionsParams
) => {
  const { data } = await client.get(
    `/swap/transactions/recent?order=${params.order}&page=${params.page}&take=${params.take}&token=${params.token}`
  )
  return data
}

export const useGetTokenTransactions = (
  { token, order = 'ASC', page = 1, take = 20 }: ApiTokenTransactionsParams,
  options?: Partial<UseQueryOptions<ApiTokenTransactionsResponse>>
) => {
  return useQuery<ApiTokenTransactionsResponse>({
    queryKey: ['/swap/transactions/recent', token, order, page, take],
    queryFn: () => getTokenTransactions({ token, order, page, take }),
    ...options,
  })
}

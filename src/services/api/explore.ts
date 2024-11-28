import { useQuery } from '@tanstack/react-query'

import client from '../axios/client'

import {
  TokensParams,
  TokensResponse,
  TokensTopResponse,
  TransactionsResponse,
} from '@/types/explore'

export const getTokens = async (params: TokensParams) => {
  const { data } = await client.get(`/tokens`, { params })
  return data
}

export const useGetTokens = (params: TokensParams) => {
  return useQuery<TokensResponse>({
    queryKey: ['/tokens', params.order, params.page],
    queryFn: () => getTokens(params),
  })
}

export const getTokensTop = async () => {
  const { data } = await client.get(`/tokens/top`)
  return data
}
export const useGetTokensTop = () => {
  return useQuery<TokensTopResponse>({
    queryKey: ['/tokens/top'],
    queryFn: () => getTokensTop(),
  })
}

export const getTransactions = async (params: TokensParams) => {
  const { data } = await client.get(`/swap/transactions/recent`, { params })
  return data
}
export const useGetTransactions = (params: TokensParams) => {
  return useQuery<TransactionsResponse>({
    queryKey: [
      '/transactions/recent',
      params.order,
      params.page,
      params.token,
      params.poolAddress,
    ],
    queryFn: () => getTransactions(params),
  })
}

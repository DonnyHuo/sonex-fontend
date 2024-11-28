import { useDebounce } from '@uidotdev/usehooks'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import client from '../axios/client'

import {
  ApiQuoteParams,
  ApiQuoteResponse,
  ApiTokenListResponse,
  ApiTokenPairsResponse,
  ApiTopTokenListResponse,
} from '@/types/api'

export const getTokenList = async () => {
  const { data } = await client.get(`/tokens/list?order=ASC&page=1&take=50`)
  return data
}

export const useGetTokenList = () => {
  return useQuery<ApiTokenListResponse>({
    queryKey: ['tokens/list'],
    queryFn: () => getTokenList(),
  })
}

export const getTopTokenList = async () => {
  const { data } = await client.get(`/tokens/top`)
  return data
}

export const useGetTopTokenList = () => {
  return useQuery<ApiTopTokenListResponse>({
    queryKey: ['tokens/top'],
    queryFn: () => getTopTokenList(),
  })
}

export const getTokenPairs = async () => {
  const { data } = await client.get(`/tokens/pairs`)
  return data
}

export const useGetTokenPair = (
  options?: Partial<UseQueryOptions<ApiTokenPairsResponse>>
) => {
  return useQuery<ApiTokenPairsResponse>({
    queryKey: ['tokens/pairs'],
    queryFn: () => getTokenPairs(),
    ...options,
  })
}

export const getQuote = async (params: ApiQuoteParams) => {
  const { data } = await client.get(
    `/quote?tokenIn=${params.tokenIn}&tokenOut=${params.tokenOut}&quoteAmount=${params.quoteAmount}`
  )
  return data
}

export const useGetQuote = (
  params: ApiQuoteParams,
  options?: Partial<UseQueryOptions<ApiQuoteResponse>>
) => {
  const [queryParams] = useDebounce([params.quoteAmount], 1000)
  return useQuery<ApiQuoteResponse>({
    queryKey: ['quote', params.tokenIn, params.tokenOut, queryParams],
    queryFn: () => getQuote(params),
    ...options,
  })
}

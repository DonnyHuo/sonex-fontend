import {
  ApiPoolInfoParams,
  ApiPoolInfoResponse,
  ApiPoolSwapStatsParams,
  ApiPoolSwapStatsResponse,
} from "@/types/api";
import {
  PoolsAddressResponse,
  PoolsMyPositionsResponse,
  PoolsParams,
  PoolsParamsByAddress,
  PoolsPositionBalanceParams,
  PoolsPositionBalanceResponse,
  PoolsPositionByIdResponse,
  PoolsPositionRangeResponse,
  PoolsPositionsParams,
  PoolsPositionsResponse,
  PoolsResponse,
  PoolsTopResponse,
  PoolsUsdtResponse,
} from "@/types/pools";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import client from "../axios/client";

export const getPools = async (params: PoolsParams) => {
  const { data } = await client.get(`/pools`, { params });
  return data;
};

export const useGetPools = (params: PoolsParams) => {
  return useQuery<PoolsResponse>({
    queryKey: [
      "/pools",
      [params.token0Address, params.token1Address, params.page],
    ],
    queryFn: () => getPools(params),
    staleTime: 0,
  });
};

export const getPoolsByAddress = async (
  address: string,
  params: PoolsParamsByAddress
) => {
  const { data } = await client.get(`/pools/${address}`, { params });
  return data;
};

export const useGetPoolsByAddress = (
  address: string,
  params: PoolsParamsByAddress
) => {
  return useQuery<PoolsAddressResponse>({
    queryKey: ["/pools-address", address],
    queryFn: () => getPoolsByAddress(address, params),
    enabled: !!address,
  });
};

export const getPoolsTop = async () => {
  const { data } = await client.get(`/pools/top`);
  return data;
};

export const useGetPoolsTop = () => {
  return useQuery<PoolsTopResponse>({
    queryKey: ["/pools/top"],
    queryFn: () => getPoolsTop(),
  });
};

export const getPoolsUsdt = async () => {
  const { data } = await client.get(`/pools/usdt`);
  return data;
};

export const useGetPoolsUsdt = () => {
  return useQuery<PoolsUsdtResponse>({
    queryKey: ["/pools/usdt"],
    queryFn: () => getPoolsUsdt(),
  });
};

export const getPoolsPositions = async (params: PoolsPositionsParams) => {
  const { data } = await client.get(`/pools/positions`, { params });
  return data;
};

export const useGetPoolsPositions = (params: PoolsPositionsParams) => {
  return useQuery<PoolsPositionsResponse>({
    queryKey: ["/pools/positions", params.interval, params.address],
    queryFn: () => getPoolsPositions(params),
    enabled: !!params.address,
  });
};

export const getPoolsPositionById = async (id: string) => {
  const { data } = await client.get(`/pools/position/${id}`);
  return data;
};

export const useGetPoolsPositionById = (id: string) => {
  return useQuery<PoolsPositionByIdResponse>({
    queryKey: ["/pools/position", id],
    queryFn: () => getPoolsPositionById(id),
    enabled: !!id,
  });
};

export const getPoolsMyPositions = async (params: {
  address?: string;
  isClosed?: boolean;
}) => {
  const { data } = await client.get(`/pools/my-positions`, { params });
  return data;
};

export const useGetPoolsMyPositions = (params: {
  address?: string;
  isClosed?: boolean;
}) => {
  return useQuery<PoolsMyPositionsResponse>({
    queryKey: ["/pools/my-positions", params.address, params.isClosed],
    queryFn: () => getPoolsMyPositions(params),
    enabled: !!params.address,
  });
};

export const getPoolsPositionBalance = async (
  params: PoolsPositionBalanceParams
) => {
  const { data } = await client.get(`/pools/position/${params.id}/balance`, {
    params: {
      interval: params.interval,
      address: params.address,
    },
  });
  return data;
};

export const useGetPoolsPositionBalance = (
  params: PoolsPositionBalanceParams
) => {
  return useQuery<PoolsPositionBalanceResponse>({
    queryKey: [
      "/pools/position/balance",
      params.id,
      params.interval,
      params.address,
    ],
    queryFn: () => getPoolsPositionBalance(params),
    enabled: !!params.id && !!params.interval && !!params.address,
  });
};

export const getPoolsPositionRange = async (params: {
  id: string;
  interval: string;
}) => {
  const { data } = await client.get(`/pools/position/${params.id}/range`, {
    params: {
      interval: params.interval,
    },
  });
  return data;
};

export const useGetPoolsPositionRange = (params: {
  id: string;
  interval: string;
}) => {
  return useQuery<PoolsPositionRangeResponse>({
    queryKey: ["/pools/position/range", params.id, params.interval],
    queryFn: () => getPoolsPositionRange(params),
    enabled: !!params.id && !!params.interval,
  });
};

export const getPoolInfo = async (params: ApiPoolInfoParams) => {
  const { data } = await client.get(`/pools/${params.address}/info`);
  return data;
};

export const useGetPoolInfo = (
  params: ApiPoolInfoParams,
  options?: Partial<UseQueryOptions<ApiPoolInfoResponse>>
) => {
  return useQuery<ApiPoolInfoResponse>({
    queryKey: ["/pools/info", params.address],
    queryFn: () => getPoolInfo(params),
    ...options,
  });
};

export const getPoolSwapStats = async (params: ApiPoolSwapStatsParams) => {
  const { data } = await client.get(`/pools/${params.address}/swap-stat`, {
    params: {
      interval: params.interval,
    },
  });
  return data;
};

export const useGetPoolSwapStats = (
  params: ApiPoolSwapStatsParams,
  options?: Partial<UseQueryOptions<ApiPoolSwapStatsResponse>>
) => {
  return useQuery<ApiPoolSwapStatsResponse>({
    queryKey: ["/pools/swap-stat", params.address, params.interval],
    queryFn: () => getPoolSwapStats(params),
    ...options,
  });
};

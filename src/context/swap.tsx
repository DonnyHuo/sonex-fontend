import type React from 'react'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useGetQuote } from '@/services/api/swap'
import { ApiQuoteRoute, TokenInfo } from '@/types/api'
import { fromReadableAmount, toReadable } from '@/utils/conversion'

export interface SwapContextProps {
  tokenIn: Partial<TokenInfo> | undefined
  setTokenIn: (token: Partial<TokenInfo> | undefined) => void
  tokenInAmount: number
  setTokenInAmount: (amount: number) => void
  tokenOut: Partial<TokenInfo> | undefined
  setTokenOut: (token: Partial<TokenInfo> | undefined) => void
  tokenOutAmount: string
  setTokenOutAmount: (amount: string) => void
  fee: number
  setFee: (fee: number) => void
  bestRoute:
    | {
        route: Array<ApiQuoteRoute>
        quote: string
        gasLimit: string
        priceAfter: string
        priceImpact: string
      }
    | undefined
  quoteInfo: ApiQuoteRoute | undefined
  isInQuoting: boolean
  customMaxSlippage: boolean
  setCustomMaxSlippage: (auto: boolean) => void
  defaultMaxSlippageWhenAuto: number
  maxSlippage: number
  setMaxSlippage: (slippage: number) => void
  transationDeadline: number
  setTransationDeadline: (deadline: number) => void
  refetchBalanceIndicator: number
  triggerBalanceRefetch: () => void
  isWrapSwap: boolean
}

const defaultContext: SwapContextProps = {
  tokenIn: undefined,
  setTokenIn: () => undefined,
  tokenInAmount: 0,
  setTokenInAmount: () => undefined,
  tokenOut: undefined,
  setTokenOut: () => undefined,
  tokenOutAmount: '0',
  setTokenOutAmount: () => undefined,
  fee: 500,
  setFee: () => undefined,
  bestRoute: undefined,
  quoteInfo: undefined,
  isInQuoting: false,
  customMaxSlippage: true,
  setCustomMaxSlippage: () => undefined,
  defaultMaxSlippageWhenAuto: 0.5,
  maxSlippage: 0.5,
  setMaxSlippage: () => undefined, // 50 bips, or 0.50%
  transationDeadline: 20, // minutes from the current Unix time
  setTransationDeadline: () => undefined,
  refetchBalanceIndicator: 1,
  triggerBalanceRefetch: () => undefined,
  isWrapSwap: false,
}

export const SwapContext = createContext<SwapContextProps>(defaultContext)

export const SwapContextProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [tokenIn, setTokenIn] = useState<Partial<TokenInfo> | undefined>(
    defaultContext.tokenIn
  )
  const [tokenInAmount, setTokenInAmount] = useState<number>(
    defaultContext.tokenInAmount
  )
  const [tokenOut, setTokenOut] = useState<Partial<TokenInfo> | undefined>(
    defaultContext.tokenOut
  )
  const [tokenOutAmount, setTokenOutAmount] = useState<string>(
    defaultContext.tokenOutAmount
  )

  const setTokenInProxy = useCallback(
    (token: Partial<TokenInfo> | undefined) => {
      setTokenIn(token)
      if (tokenOut?.symbol === token?.symbol) {
        setTokenOut(undefined)
        setTokenOutAmount('0')
      }
    },
    [tokenOut]
  )

  const [fee, setFee] = useState<number>(defaultContext.fee)
  const [bestRoute, setBestRoute] = useState<
    | {
        route: Array<ApiQuoteRoute>
        quote: string
        gasLimit: string
        priceAfter: string
        priceImpact: string
      }
    | undefined
  >(defaultContext.bestRoute)
  const [quoteInfo, setQuoteInfo] = useState<ApiQuoteRoute | undefined>(
    defaultContext.quoteInfo
  )
  const [customMaxSlippage, setCustomMaxSlippage] = useState<boolean>(
    defaultContext.customMaxSlippage
  )
  const [defaultMaxSlippageWhenAuto] = useState<number>(
    defaultContext.defaultMaxSlippageWhenAuto
  )
  const [maxSlippage, setMaxSlippage] = useState<number>(
    defaultContext.maxSlippage
  )
  const [transationDeadline, setTransationDeadline] = useState<number>(
    defaultContext.transationDeadline
  )

  const isWrapSwap = useMemo(
    () =>
      (tokenIn?.symbol?.toLowerCase() === 'eth' &&
        tokenOut?.symbol?.toLowerCase() === 'weth') ||
      (tokenIn?.symbol?.toLowerCase() === 'weth' &&
        tokenOut?.symbol?.toLowerCase() === 'eth'),
    [tokenIn?.symbol, tokenOut?.symbol]
  )

  const enableQuote = useMemo(
    () => !isWrapSwap && !!tokenIn && !!tokenOut && tokenInAmount >= 0,
    [tokenIn, tokenInAmount, tokenOut, isWrapSwap]
  )

  const { data: quoteData, isFetching: isQuoting } = useGetQuote(
    {
      tokenIn:
        tokenIn?.symbol?.toLowerCase() === 'eth'
          ? 'WETH'
          : tokenIn?.symbol ?? '',
      tokenOut:
        tokenOut?.symbol?.toLowerCase() === 'eth'
          ? 'WETH'
          : tokenOut?.symbol ?? '',
      quoteAmount: fromReadableAmount(
        tokenInAmount,
        tokenIn?.decimals ?? 18
      ).toString(),
    },
    {
      enabled: enableQuote,
      staleTime: 1000,
    }
  )

  const setTokenOutAmountProxy = useCallback(
    (quoteAmount: string) => {
      const qAmt = toReadable(BigInt(quoteAmount), tokenOut?.decimals ?? 18, 6)
      const toFixedNumber = parseFloat(qAmt) > 1000 ? 4 : 6
      setTokenOutAmount(parseFloat(qAmt).toFixed(toFixedNumber))
    },
    [tokenOut?.decimals]
  )

  useEffect(() => {
    if (quoteData?.bestRoutes?.route?.[0]) {
      setTokenOutAmountProxy(quoteData.bestRoutes.quote)
      setBestRoute(quoteData?.bestRoutes)
      setQuoteInfo(quoteData?.bestRoutes?.route?.[0])
    } else if (!isQuoting && enableQuote) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      quoteInfo && setQuoteInfo(undefined)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      // tokenOut && setTokenOut(undefined)
      setTokenOutAmount('0')
    }
  }, [
    quoteData,
    setTokenOutAmountProxy,
    quoteInfo,
    isQuoting,
    enableQuote,
    setTokenOutAmount,
  ])

  const [refetchBalanceIndicator, setRefetchBalanceIndicator] = useState(
    defaultContext.refetchBalanceIndicator
  )
  const triggerBalanceRefetch = useCallback(() => {
    setRefetchBalanceIndicator((prev) => prev + 1)
  }, [])

  useEffect(() => {
    if (isWrapSwap) {
      setTokenOutAmount(tokenInAmount.toString())
    }
  }, [isWrapSwap, setTokenOutAmountProxy, tokenInAmount])

  return (
    <SwapContext.Provider
      value={{
        tokenIn,
        setTokenIn: setTokenInProxy,
        tokenInAmount,
        setTokenInAmount,
        tokenOut,
        setTokenOut,
        tokenOutAmount,
        setTokenOutAmount,
        fee,
        setFee,
        bestRoute,
        quoteInfo,
        isInQuoting: isQuoting,
        customMaxSlippage,
        setCustomMaxSlippage,
        defaultMaxSlippageWhenAuto,
        maxSlippage,
        setMaxSlippage,
        transationDeadline,
        setTransationDeadline,
        refetchBalanceIndicator,
        triggerBalanceRefetch,
        isWrapSwap,
      }}
    >
      {children}
    </SwapContext.Provider>
  )
}

export const useSwapContext = (): SwapContextProps => {
  const context = useContext(SwapContext)
  if (context === undefined) {
    throw new Error('useSwapContext must be used within a SwapContextProvider')
  }
  return context
}

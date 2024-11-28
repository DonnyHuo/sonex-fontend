import type React from 'react'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'

import { SwapModal } from '@/components/SwapModal'
import {
  SwapSettingsModal,
  SwapSettingsModalProps,
} from '@/components/SwapSettingsModal'
import {
  TokenListModal,
  TokenListModalProps,
} from '@/components/TokenListModal'
import { ApiQuoteRoute, TokenInfo } from '@/types/api'

export enum ModalType {
  TokenListModal = 'TokenListModal',
  SwapSettingsModal = 'SwapSettingsModal',
}

const MODAL_COMPONENTS = {
  [ModalType.TokenListModal]: TokenListModal,
  [ModalType.SwapSettingsModal]: SwapSettingsModal,
}

type ModalProps = TokenListModalProps | SwapSettingsModalProps | undefined

type ModalStore = { type: ModalType | null; props?: ModalProps }

export type SwapParams = {
  tokenIn: Partial<TokenInfo> | undefined
  tokenInAmount: number
  tokenOut: Partial<TokenInfo> | undefined
  tokenOutAmount: string
  quoteInfo: ApiQuoteRoute | undefined
  bestRoute:
    | {
        route: Array<ApiQuoteRoute>
        quote: string
        gasLimit: string
        priceAfter: string
        priceImpact: string
      }
    | undefined
  statusModalContext?: {
    txnHash: string
    isWaitingConfirmInBlockchain: boolean
    errorWhenConfirmInBlockchain: Error | null
  }
}

export interface ModalContextProps {
  store: ModalStore
  isModalShown: (modal: ModalType) => boolean
  showModal: <T extends ModalProps>(modal: ModalType, props?: T) => void
  hideModal: () => void
  createSwapModal: (params: SwapParams) => string
  dismissSwapModal: (modalId: string) => void
}

const defaultContext: ModalContextProps = {
  store: { type: null, props: undefined },
  isModalShown: () => false,
  showModal: () => null,
  hideModal: () => null,
  createSwapModal: () => '',
  dismissSwapModal: () => undefined,
}

export const ModalContext = createContext<ModalContextProps>(defaultContext)

export const ModalProvider: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const [store, setStore] = useState<ModalStore>(defaultContext.store)

  const isModalShown = useCallback(
    (modal: ModalType) => {
      return modal === store.type
    },
    [store]
  )

  const showModal = useCallback(
    <T extends ModalProps>(type: ModalType, props?: T) => {
      setStore({ ...store, type, props })
    },
    [store]
  )

  const hideModal = useCallback(
    () => setStore({ type: null, props: undefined }),
    []
  )

  const renderComponent = () => {
    if (!store.type) {
      return null
    }

    const ModalComponent = MODAL_COMPONENTS[store.type]
    return <ModalComponent {...(store.props as any)} /> // eslint-disable-line
  }

  const [swapMap, setSwapMap] = useState<{ [key: string]: SwapParams }>({})

  const createSwapModal = useCallback(
    (params: SwapParams) => {
      const modalId = new Date().getTime().toString()
      setSwapMap({ ...swapMap, [modalId]: params })
      return modalId
    },
    [swapMap]
  )

  const dismissSwapModal = useCallback(
    (modalId: string) => {
      if (modalId && swapMap[modalId]) {
        const newMap = { ...swapMap }
        delete newMap[modalId]
        setSwapMap(newMap)
      }
    },
    [swapMap]
  )

  return (
    <ModalContext.Provider
      value={{
        ...defaultContext,
        store,
        isModalShown,
        showModal,
        hideModal,
        createSwapModal,
        dismissSwapModal,
      }}
    >
      {Object.keys(swapMap).map((modalId) => (
        <SwapModal
          key={modalId}
          onClose={() => dismissSwapModal(modalId)}
          params={swapMap[modalId]}
        />
      ))}
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextProps => {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

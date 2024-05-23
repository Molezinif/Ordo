import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback
} from 'react'
import {
  getSalesHistory,
  getStock,
  queryStockSearch
} from '@/services/repositories'
interface ItensContextData {
  stockItems: any
  selectedItensToSell: any[]
  setSelectedItensToSell: React.Dispatch<React.SetStateAction<any[]>>
  salesHistory: any[]
  setSalesHistory: React.Dispatch<React.SetStateAction<any[]>>
  notFoundProducts: boolean
  handleGetStock(): any
  handleGetSalesHistory(): any
  handleSearchStock(search: string): any
  triggerTransaction: boolean
  setTriggerTransaction: React.Dispatch<React.SetStateAction<boolean>>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const ItensContext = createContext<ItensContextData>({} as ItensContextData)

const ItemProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [stockItems, setStockItems] = useState<any>([])
  const [selectedItensToSell, setSelectedItensToSell] = useState<any>([])
  const [salesHistory, setSalesHistory] = useState<any>([])
  const [notFoundProducts, setNotFoundProducts] = useState<boolean>(false)
  const [triggerTransaction, setTriggerTransaction] = useState<boolean>(true)

  const handleGetStock = useCallback(async () => {
    await getStock().then((data) => {
      if (data.length === 0) {
        setNotFoundProducts(true)
        return
      }
      setStockItems(data)
      setNotFoundProducts(false)
    })
  }, [])

  const handleSearchStock = async (search: string) => {
    await queryStockSearch(search).then((data) => {
      if (data.length === 0) {
        setNotFoundProducts(true)
        return
      }
      setStockItems(data)
      setNotFoundProducts(false)
    })
  }

  const handleGetSalesHistory = useCallback(async () => {
    await getSalesHistory().then((data) => {
      setSalesHistory(data)
    })
  }, [])

  const contextValue: ItensContextData = useMemo(
    () => ({
      stockItems,
      handleGetStock,
      setSelectedItensToSell,
      selectedItensToSell,
      salesHistory,
      setSalesHistory,
      handleGetSalesHistory,
      handleSearchStock,
      notFoundProducts,
      triggerTransaction,
      setTriggerTransaction
    }),
    [
      handleGetSalesHistory,
      handleGetStock,
      salesHistory,
      selectedItensToSell,
      stockItems,
      handleSearchStock,
      notFoundProducts
    ]
  )

  return (
    <ItensContext.Provider value={contextValue}>
      {children}
    </ItensContext.Provider>
  )
}

function useItens(): ItensContextData {
  const context = useContext(ItensContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { ItemProvider, useItens }

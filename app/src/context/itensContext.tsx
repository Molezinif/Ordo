import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback
} from 'react'
import { StockRepository } from '@/services/Repositories'
interface ItensContextData {
  stockItems: any
  selectedItensToSell: any[]
  setSelectedItensToSell: React.Dispatch<React.SetStateAction<any[]>>
  handleGetStock(): any
}

interface AuthProviderProps {
  children: React.ReactNode
}

const ItensContext = createContext<ItensContextData>({} as ItensContextData)

const ItemProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [stockItems, setStockItems] = useState<any>([])
  const [selectedItensToSell, setSelectedItensToSell] = useState<any>([])

  const handleGetStock = useCallback(async () => {
    const stockRepo = new StockRepository()
    await stockRepo.getStocks().then((data) => {
      setStockItems(data)
    })
  }, [])

  const contextValue: ItensContextData = useMemo(
    () => ({
      stockItems,
      handleGetStock,
      setSelectedItensToSell,
      selectedItensToSell
    }),
    [handleGetStock, selectedItensToSell, stockItems]
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

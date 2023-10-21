import React, { createContext, useContext, useMemo, useState } from 'react'
import { useCallback } from 'react'
import { StockRepository } from '@/services/Repositories'
interface User {
  name: string | null
  email: string | null
}

interface ItensContextData {
  stockItems: any
  handleGetStock(): any
}

interface AuthProviderProps {
  children: React.ReactNode
}

const ItensContext = createContext<ItensContextData>({} as ItensContextData)

const ItemProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [stockItems, setStockItems] = useState<any>([])
  const stockRepo = new StockRepository()

  const handleGetStock = useCallback(async () => {
    const data = await stockRepo.getStocks().then((data) => data)
    setStockItems(data)
    console.log('stockItems', stockItems)
  }, [])

  const contextValue: ItensContextData = useMemo(
    () => ({
      stockItems,
      handleGetStock
    }),
    []
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

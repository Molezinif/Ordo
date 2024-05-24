import { Dashboard } from '@/screens/Dashboard'
import { render } from '@testing-library/react-native'
import { expect, test, jest } from '@jest/globals'
import { NativeBaseProvider } from 'native-base'
import { ItemProvider } from '@/context/itensContext'

test('Dashboard renders greeting', () => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 }
  }

  jest.mock('@/context/itensContext', () => {
    return {
      useItens: () => ({
        handleGetSalesHistory: () => {}
      })
    }
  })

  jest.mock('@/services/repositories/expenditure', () => {
    return {
      getAverageMonthlyExpenditures: () => ({
        averageInventoryCost: 0,
        averageVariableCost: 0,
        averageOtherCost: 0,
        averageTotalCost: 0
      })
    }
  })

  jest.mock('@/services/repositories/transactions', () => {
    return {
      getAllTransactions: () => []
    }
  })

  const screen = render(
    <NativeBaseProvider initialWindowMetrics={inset}>
      <ItemProvider>
        <Dashboard navigation={{}} />
      </ItemProvider>
    </NativeBaseProvider>
  )

  screen.debug()

  const greeting = screen.getByText('Olá,\nUsuário!👋')
  expect(greeting).toBeTruthy()
})

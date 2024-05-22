import {
  IMakeExpenditureParams,
  makeExpenditure
} from '@/services/repositories/expenditure'

export const useExpenditure = () => {
  const handleMakeExpenditure = async (data: IMakeExpenditureParams) => {
    try {
      await makeExpenditure(data)
      return true
    } catch {
      return false
    }
  }

  return {
    handleMakeExpenditure
  }
}

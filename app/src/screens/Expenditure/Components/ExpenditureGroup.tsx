import { View, Text } from 'react-native'
import { ExpenditureItem, IExpenditureItem } from './ExpenditureItem'
import { AddExpenditureItem } from './AddExpenditureItem'

export interface IExpenditureGroupProps {
  groupMonthDetails: {
    month: string
    totalValue: number
    dateObj?: Date
  }
  itens: IExpenditureItem[]
  addActionCallBack?: () => void
  itemActionCallBack?: (item: IExpenditureItem) => void
}

export const ExpenditureGroup = ({
  groupMonthDetails: { month, totalValue },
  itens,
  addActionCallBack,
  itemActionCallBack
}: IExpenditureGroupProps) => {
  return (
    <View style={{ display: 'flex', gap: 10 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20
        }}
      >
        <Text style={{ color: '#5F5F5F', fontWeight: 400 }}>{month}</Text>
        <Text style={{ color: '#5F5F5F', fontWeight: 400 }}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(totalValue)}
        </Text>
      </View>
      {addActionCallBack && (
        <AddExpenditureItem actionCallBack={() => addActionCallBack()} />
      )}
      {itens.map((item, index) => (
        <View
          key={index}
          onStartShouldSetResponder={(e) => {
            itemActionCallBack?.(item)
            return true
          }}
        >
          <ExpenditureItem item={item} />
        </View>
      ))}
    </View>
  )
}

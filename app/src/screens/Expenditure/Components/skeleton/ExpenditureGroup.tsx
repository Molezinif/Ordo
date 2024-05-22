import { View, Text } from 'react-native'
import { ExpenditureItemSkeleton, IExpenditureItem } from './ExpenditureItem'



export const ExpenditureGroupSkeleton = ({
  groupMonthDetails: { month },
}) => {
  const itens = [1, 2, 3, 4]
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
          }).format(0)}
        </Text>
      </View>
      {itens.map((_, index) => (
        <ExpenditureItemSkeleton key={index} />
      ))}
    </View>
  )
}

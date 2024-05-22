import { View, Text } from 'react-native'

export interface IExpenditureItem {
  expenditureUUID: string
  name: string
  value: number
  expenditureDate: Date
}

interface IExpenditureItemProps {
  item: IExpenditureItem
}

export const ExpenditureItem = ({
  item: { name, value }
}: IExpenditureItemProps) => {
  return (
    <View style={{ display: 'flex', gap: 10 }}>
      <View
        style={{
          backgroundColor: '#F1F1F1',
          borderRadius: 8,
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <View style={{ display: 'flex' }}>
          <Text style={{ color: '#5F5F5F', fontSize: 16 }}>{name}</Text>
        </View>
        <Text style={{ color: '#5F5F5F' }}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(value)}
        </Text>
      </View>
    </View>
  )
}

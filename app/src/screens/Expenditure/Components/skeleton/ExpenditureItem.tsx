import { View, Text } from 'react-native'

export interface IExpenditureItem {
  productUUID: string
  name: string
  value: number
}

export const ExpenditureItemSkeleton = () => {
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
          <Text style={{ color: '#5F5F5F', fontSize: 16 }}>{''}</Text>
        </View>
        <Text style={{ color: '#5F5F5F' }}>{''}</Text>
      </View>
    </View>
  )
}

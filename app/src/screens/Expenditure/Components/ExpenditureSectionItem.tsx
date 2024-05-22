import { View, Text } from 'react-native'

interface ExpenditureSectionItemProps {
  title: string
  subtitle: string
  value: string
  onClickAction?: () => void
}

export const ExpenditureSectionItem = ({
  title,
  subtitle,
  value,
  onClickAction
}: ExpenditureSectionItemProps) => {
  return (
    <View
      onStartShouldSetResponder={(e) => {
        onClickAction?.()
        return true
      }}
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
        <Text style={{ color: '#5F5F5F', fontSize: 16 }}>{title}</Text>
        <Text style={{ color: '#979797', fontSize: 12 }}>{subtitle}</Text>
      </View>
      <Text style={{ color: '#5F5F5F' }}>{value}</Text>
    </View>
  )
}

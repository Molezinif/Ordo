import { View, TouchableOpacity } from 'react-native'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

interface IAddExpenditureItemProps {
  actionCallBack: () => void
}

export const AddExpenditureItem = ({
  actionCallBack
}: IAddExpenditureItemProps) => {
  return (
    <View style={{ display: 'flex', gap: 10 }}>
      <TouchableOpacity onPress={() => actionCallBack?.()}>
        <View
          style={{
            backgroundColor: '#F1F1F1',
            borderRadius: 8,
            padding: 6,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <FontAwesome6 name="circle-plus" size={30} color={'#B9B9B9'} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

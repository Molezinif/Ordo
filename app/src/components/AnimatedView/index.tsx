import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native'

export const AnimaterFlyPaperLoading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('@/assets/flyPaper.json')}
        style={{ flex: 1, height: 300, width: 1000 }}
        autoPlay
        loop
      />
      <Text style={{ flex: 1, fontSize: 16, color: '#333333' }}>
        Estamos preparando tudo para você.
      </Text>
    </View>
  )
}

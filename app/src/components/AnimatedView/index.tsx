import { View, Text } from 'react-native'
import LottieView from 'lottie-react-native'

export const AnimaterFlyPaperLoading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('@/assets/flyPaper.json')}
        style={{ width: 1000, height: 300 }}
        autoPlay
        loop
      />
      <Text style={{ fontSize: 16, color: '#333333', textAlign: 'center' }}>
        Estamos preparando tudo para você.
      </Text>
    </View>
  )
}

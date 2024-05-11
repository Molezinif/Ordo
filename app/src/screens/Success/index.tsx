import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { useEffect } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface ISuccessProps {
  route: {
    params: {
      screenToNavigate: string
      message: string
    }
  }
}

export function Success({
  route: {
    params: { screenToNavigate, message }
  }
}: Readonly<ISuccessProps>) {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.navigate({
          name: screenToNavigate
        })
      )
    }, 3000)
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={require('@/assets/CheckedAnimation.json')}
        style={{ width: 200, height: 200 }}
        autoPlay
        loop
      />
      <Text style={{ fontSize: 22, color: '#333333', textAlign: 'center' }}>
        {message}
      </Text>
    </View>
  )
}

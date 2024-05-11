import Routes from '@/Routes'
import { AuthProvider } from '@/context/auth'
import { ItemProvider } from '@/context/itensContext'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import Toast from 'react-native-toast-message'
import React from 'react'
import 'react-native-reanimated'

export default function App() {
  return (
    <AuthProvider>
      <ItemProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
          <Toast />
        </NativeBaseProvider>
      </ItemProvider>
    </AuthProvider>
  )
}

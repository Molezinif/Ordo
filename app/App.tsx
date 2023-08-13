import Routes from '@/Routes'
import { AuthProvider } from '@/context/auth'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  )
}

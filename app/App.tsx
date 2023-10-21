import Routes from '@/Routes'
import { AuthProvider } from '@/context/auth'
import { ItemProvider } from '@/context/itensContext'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'

export default function App() {
  return (
    <AuthProvider>
      <ItemProvider>
        <NativeBaseProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </NativeBaseProvider>
      </ItemProvider>
    </AuthProvider>
  )
}

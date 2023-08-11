import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NavigationContainer } from '@react-navigation/native'
import { Register } from './src/screens/Register'
import { Login } from '@/screens/Login'
import { Home } from '@/screens/Home'
import { Dashboard } from '@/screens/Dashboard'
import { NativeBaseProvider } from 'native-base'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    //TODO: authFlow https://reactnavigation.org/docs/auth-flow
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

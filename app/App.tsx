import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { Register } from './src/screens/Register'
import { Login } from '@/screens/Login'
import { Home } from '@/screens/Home'
import { Dashboard } from '@/screens/Dashboard'
import { NativeBaseProvider, extendTheme } from 'native-base'

const Stack = createNativeStackNavigator()

export default function App() {
  const theme = extendTheme({
    primary: {
      50: '#e0f1ff',
      100: '#c0e2ff',
      200: '#a1d3ff',
      300: '#83c4fc',
      400: '#66b5fc',
      500: '#F0F8FF',
      600: '#49a3f2',
      700: '#3c9aeb',
      800: '#3190e4',
      900: '#2687dc'
    },
    config: {
      initialColorMode: 'dark'
    }
  })
  return (
    //TODO: authFlow https://reactnavigation.org/docs/auth-flow
    <NativeBaseProvider theme={theme}>
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

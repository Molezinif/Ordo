import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tabs } from './Tabs'
import { Settings } from '@/screens/Settings'

export function AppRoutes() {
  const AppStack = createNativeStackNavigator()
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Main" component={Tabs} />
      <AppStack.Screen name="Settings" component={Settings} />
    </AppStack.Navigator>
  )
}

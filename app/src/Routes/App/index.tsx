import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tabs } from './Tabs'
import React from 'react'
import { Settings } from '@/screens/Settings'
import { ItensRegister } from '@/screens/ItensRegister'
import { SelectItensToSale } from '@/screens/Sales/SelectItens'
import { Success } from '@/screens/Success'

export function AppRoutes() {
  const AppStack = createNativeStackNavigator()
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Main" component={Tabs} />
      <AppStack.Screen name="Settings" component={Settings} />
      <AppStack.Screen name="ItensRegister" component={ItensRegister} />
      <AppStack.Screen name="SelectItensToSale" component={SelectItensToSale} />
      <AppStack.Screen
        name="Success"
        component={Success as React.ComponentType}
      />
    </AppStack.Navigator>
  )
}

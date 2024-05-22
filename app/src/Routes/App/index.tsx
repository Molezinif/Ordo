import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Tabs } from './Tabs'
import React from 'react'
import { ItensRegister } from '@/screens/ItensRegister'
import { SelectItensToSale } from '@/screens/Sales/SelectItens'
import { Success } from '@/screens/Success'
import { InventoryCostExpenditure } from '@/screens/Expenditure/NestedScreens/inventoryCost'
import { Expenditures } from '@/screens/Expenditure/NestedScreens/expenditures'
import { OtherExpenditures } from '@/screens/Expenditure/NestedScreens/otherExpenditures'

export function AppRoutes() {
  const AppStack = createNativeStackNavigator()
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Main" component={Tabs} />
      <AppStack.Screen name="ItensRegister" component={ItensRegister} />
      <AppStack.Screen name="SelectItensToSale" component={SelectItensToSale} />
      <AppStack.Screen
        name="InventoryCostExpenditure"
        component={InventoryCostExpenditure}
      />
      <AppStack.Screen
        name="VariablesExpenditure"
        component={Expenditures}
      />
      <AppStack.Screen
        name="OtherExpenditures"
        component={OtherExpenditures}
      />
      <AppStack.Screen
        name="Success"
        component={Success as React.ComponentType}
      />
    </AppStack.Navigator>
  )
}

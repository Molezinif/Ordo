import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dashboard } from '@/screens/Dashboard'
import { Sales } from '@/screens/Sales'
import { Stock } from '@/screens/Stock'
import { useItens } from '@/context/itensContext'

const Tab = createBottomTabNavigator()

const Icons = {
  dashboard: (color, size) => (
    <MaterialCommunityIcons name="home" color={color} size={size} />
  ),
  sales: (color, size) => (
    <MaterialCommunityIcons name="cart" color={color} size={size} />
  ),
  stock: (color, size) => (
    <MaterialCommunityIcons name="package-variant" color={color} size={size} />
  )
}

export function Tabs() {
  const { handleGetStock, handleGetSalesHistory } = useItens()

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#65B3FF',
        headerShown: false,
        lazy: true,
        tabBarStyle: {
          display: 'flex',
          width: '100%',
          backgroundColor: 'white',
          borderTopWidth: 0
        }
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => Icons.dashboard(color, size)
        }}
        listeners={{
          tabPress: () => {
            handleGetSalesHistory()
          }
        }}
      />
      <Tab.Screen
        name="Sales"
        component={Sales}
        options={{
          tabBarLabel: 'Vendas',
          tabBarIcon: ({ color, size }) => Icons.sales(color, size)
        }}
      />
      <Tab.Screen
        name="Stock"
        component={Stock}
        listeners={{
          tabPress: () => {
            handleGetStock()
          }
        }}
        options={{
          tabBarLabel: 'Estoque',
          tabBarIcon: ({ color, size }) => Icons.stock(color, size)
        }}
      />
    </Tab.Navigator>
  )
}

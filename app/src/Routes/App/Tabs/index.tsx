import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dashboard } from '@/screens/Dashboard'
import { Sales } from '@/screens/Sales'
import { Stock } from '@/screens/Stock'

const Tab = createBottomTabNavigator()

const Icons = {
  dashboard: (color, size) => (
    <MaterialCommunityIcons name="home" color={color} size={size} />
  ),
  sales: (color, size) => (
    <MaterialCommunityIcons name="shopping" color={color} size={size} />
  ),
  stock: (color, size) => (
    <MaterialCommunityIcons name="package-variant" color={color} size={size} />
  )
}

export function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#4FCDED',
        headerShown: false,
        lazy: true
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => Icons.dashboard(color, size)
        }}
      />
      <Tab.Screen
        name="Register"
        component={Sales}
        options={{
          tabBarLabel: 'Vendas',
          tabBarIcon: ({ color, size }) => Icons.sales(color, size)
        }}
      />
      <Tab.Screen
        name="Stock"
        component={Stock}
        options={{
          tabBarLabel: 'Estoque',
          tabBarIcon: ({ color, size }) => Icons.stock(color, size)
        }}
      />
    </Tab.Navigator>
  )
}

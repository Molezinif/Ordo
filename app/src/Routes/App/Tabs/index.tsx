import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { Dashboard } from '@/screens/Dashboard'
import { Sales } from '@/screens/Sales'
import { Stock } from '@/screens/Stock'
import { useItens } from '@/context/itensContext'
import { TouchableOpacity, View, StyleSheet, Platform } from 'react-native'

const Tab = createBottomTabNavigator()

export function Tabs() {
  const { handleGetStock, handleGetSalesHistory } = useItens()
  // shadow-offset: 0px 2px;shadow-opacity: 0.5; shadow-radius: 4px;
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: 'flex',
          position: 'absolute',
          bottom: 25,
          left: 80,
          right: 80,
          elevation: 0.8,
          backgroundColor: 'white',
          borderRadius: 30,
          height: 60,
          shadowOffset: {
            width: 0,
            height: 0.5
          },
          shadowOpacity: 0.1,
          shadowRadius: 4
        },
        tabBarShowLabel: false,
        headerShown: false
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 14 : 0
              }}
            >
              <FontAwesome6
                name="house-chimney"
                size={20}
                color={focused ? '#65B3FF' : '#7C7C8A'}
              />
            </View>
          )
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
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 14 : 0
              }}
            >
              <FontAwesome6
                name="cart-shopping"
                size={20}
                color={focused ? '#65B3FF' : '#7C7C8A'}
              />
            </View>
          )
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
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? 14 : 0
              }}
            >
              <FontAwesome6
                name="box"
                size={20}
                color={focused ? '#65B3FF' : '#7C7C8A'}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  )
}

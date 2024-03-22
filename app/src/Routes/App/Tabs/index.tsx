import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { Dashboard } from '@/screens/Dashboard'
import { Sales } from '@/screens/Sales'
import { Stock } from '@/screens/Stock'
import { useItens } from '@/context/itensContext'
import { View, Platform } from 'react-native'

const Tab = createBottomTabNavigator()

export function Tabs() {
  const { handleGetStock, handleGetSalesHistory } = useItens()
  // shadow-offset: 0px 2px;shadow-opacity: 0.5; shadow-radius: 4px;
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4,
            backgroundColor: 'white',
            borderRadius: 16,
            margin: 22,
            height: 60,
            shadowOffset: {
              width: 0,
              height: 0.5
            },
            opacity: 0.96,
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
                  size={22}
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
                  size={22}
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
                  size={22}
                  color={focused ? '#65B3FF' : '#7C7C8A'}
                />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Graphs"
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
                  name="chart-simple"
                  size={22}
                  color={focused ? '#65B3FF' : '#7C7C8A'}
                />
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

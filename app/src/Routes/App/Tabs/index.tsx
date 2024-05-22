import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { Dashboard } from '@/screens/Dashboard'
import { Sales } from '@/screens/Sales'
import { Stock } from '@/screens/Stock'
import { useItens } from '@/context/itensContext'
import { View, Platform } from 'react-native'
import { Chart } from '@/screens/Charts'
import { Expenditures } from '@/screens/Expenditure/NestedScreens/expenditures'

const Tab = createBottomTabNavigator()

const routes = {
  DASHBOARD: 'Dashboard',
  SALES: 'Sales',
  STOCK: 'Stock',
  CHARTS: 'Charts'
}

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
            borderRadius: 40,
            marginTop: 10,
            marginBottom: 22,
            marginHorizontal: 22,
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
                  name="house"
                  size={22}
                  color={focused ? '#3789db' : '#7C7C8A'}
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
          name="Expenditure"
          component={Expenditures}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 14 : 0
                }}
              >
                <FontAwesome6
                  name="file-circle-plus"
                  size={22}
                  color={focused ? '#3789db' : '#7C7C8A'}
                />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Sales"
          component={Sales}
          options={() => ({
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? 14 : 0
                }}
              >
                <FontAwesome6
                  name="dollar-sign"
                  size={28}
                  color={focused ? '#3789db' : '#7C7C8A'}
                />
              </View>
            )
          })}
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
                  color={focused ? '#3789db' : '#7C7C8A'}
                />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Graphs"
          component={Chart}
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
                  color={focused ? '#3789db' : '#7C7C8A'}
                />
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

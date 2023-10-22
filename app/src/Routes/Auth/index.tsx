import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Register } from '@/screens/Register'
import { Login } from '@/screens/Login'
import React from 'react'

export function AuthRoutes() {
  const AuthStack = createNativeStackNavigator()
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  )
}

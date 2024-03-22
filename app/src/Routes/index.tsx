import { useAuth } from '@/context/auth'
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { AppRoutes } from './App'
import { AuthRoutes } from './Auth'

const Routes: React.FC = () => {
  const { signed, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3789db" />
      </View>
    )
  }

  return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes

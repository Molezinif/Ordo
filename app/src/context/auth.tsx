import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'
import * as auth from '../services/auth'

interface User {
  name: string
  email: string
}

interface AuthContextData {
  signed: boolean
  user: User | null
  loading: boolean
  signIn(): Promise<void>
  signOut(): void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData() {
      try {
        const [storagedUser, storagedToken] = await AsyncStorage.multiGet([
          '@RNAuth:user',
          '@RNAuth:token'
        ])

        if (storagedUser[1] && storagedToken[1]) {
          setUser(JSON.parse(storagedUser[1]))
          api.defaults.headers.Authorization = `Bearer ${storagedToken[1]}`
        }
      } catch (error) {
        console.error('Error loading authentication data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStorageData()
  }, [])

  async function signIn() {
    try {
      setLoading(true)
      const { data } = await auth.signIn()
      setUser(data.user)

      api.defaults.headers.Authorization = `Bearer ${data.token}`

      await AsyncStorage.multiSet([
        ['@RNAuth:user', JSON.stringify(data.user)],
        ['@RNAuth:token', data.token]
      ])
      setLoading(false)
    } catch (error) {
      console.error('Error signing in:', error)
      setLoading(false)
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.multiRemove(['@RNAuth:user', '@RNAuth:token'])
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const contextValue: AuthContextData = useMemo(
    () => ({
      signed: !!user,
      user,
      loading,
      signIn,
      signOut
    }),
    [user, loading]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { AuthProvider, useAuth }

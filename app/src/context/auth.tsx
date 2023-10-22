import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../../firebase'
import {
  signInWithEmailAndPassword,
  signOut as userSignOut
} from 'firebase/auth'
interface User {
  name: string | null
  email: string | null
}

interface AuthContextData {
  signed: boolean
  user: User | null
  loading: boolean
  signIn({ email, password }): Promise<void>
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
    const loadStorageData = async () => {
      try {
        const [storagedUser] = await AsyncStorage.multiGet(['@RNAuth:user'])

        if (storagedUser[1]) {
          setUser(JSON.parse(storagedUser[1]))
        }
      } catch (error) {
        console.error('Error loading authentication data:', error)
      } finally {
        setLoading(false)
      }
    }

    void loadStorageData()
  }, [])

  async function signIn({ email, password }) {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      console.log(auth.currentUser)
      const user = auth.currentUser
      if (user)
        setUser({
          email: user.email,
          name: user?.displayName
        })
      await AsyncStorage.multiSet([['@RNAuth:user', JSON.stringify(user)]])
      setLoading(false)
    } catch (error) {
      console.error('Error signing in:', error)
      setLoading(false)
    }
  }

  async function signOut() {
    try {
      await userSignOut(auth)
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

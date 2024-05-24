import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    ...mockAsyncStorage,
    getItem: jest.fn(() => Promise.resolve(JSON.stringify({ uid: '123' })))
  }
})

jest.mock('@/context/auth', () => {
  return {
    useAuth: () => ({
      signOut: () => console.log('rendering')
    })
  }
})

jest.mock('@firebase/auth', () => {
  return {
    getAuth: jest.fn(() => ({
      onAuthStateChanged: jest.fn(() => jest.fn())
    })),
    initializeAuth: jest.fn(),
  }
})

jest.mock('uuid', () => {
  let value = 0
  return {
    v4: () => {
      value += 1
      return value
    }
  }
})

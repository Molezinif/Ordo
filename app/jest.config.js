module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|firebase|@firebase|@react-native-async-storage)/)'
  ],
  setupFiles: ['./jestSetupFile.js']
}

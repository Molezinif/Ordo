import React from 'react'
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native'

const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>
        Comece agora,
        {'\n'}
        Gerencie seu tempo e dinheiro com Ordo!
      </Text>
    </View>
    <View style={styles.button}>
      <Button
        title="Começar"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'regular',
    marginVertical: 8,
  },
  button: {
    textAlign: 'center',
    marginTop: 12,
  },
})

export default HomeScreen

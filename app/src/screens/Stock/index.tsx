import { useItens } from '@/context/itensContext'
import { Container, FloatButton } from './styles'
import { StockCard } from '@/components/StockCard'
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

export function Stock({ navigation }: any) {
  const { handleGetStock, stockItems } = useItens()

  useEffect(() => {
    const data = async () => {
      await handleGetStock()
    }
    void data()
  }, [handleGetStock])

  return (
    <Container>
      <Text style={{ fontSize: 22, fontWeight: '400' }}>Estoque</Text>
      {stockItems?.length ? (
        <StockCard itens={stockItems} />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#00b7ff" />
        </View>
      )}
      <FloatButton
        onPress={() => {
          navigation.navigate('ItensRegister')
        }}
      >
        <AntDesign name="pluscircle" color={'#65B3FF'} size={50} />
      </FloatButton>
    </Container>
  )
}

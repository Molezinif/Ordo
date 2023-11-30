import { useItens } from '@/context/itensContext'
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { Container, ContentContainer, StockContentContainer } from './styles'
import { SelectItensFromStockCard } from '@/components/SelectItensFromStockCard'

export function SelectItensToSale({ navigation }: any) {
  const { handleGetStock, stockItems } = useItens()

  useEffect(() => {
    const data = async () => {
      await handleGetStock()
    }
    void data()
  }, [handleGetStock])

  return (
    <Container>
      <ContentContainer>
        <Text style={{ fontSize: 18, fontWeight: '300' }}>
          Selecione um item
        </Text>
        <StockContentContainer>
          {stockItems?.length ? (
            <SelectItensFromStockCard
              itens={stockItems}
              isItensSelectable
              navigateCallBack={() => {
                navigation.navigate('Main')
              }}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <ActivityIndicator size="large" color="#00b7ff" />
            </View>
          )}
        </StockContentContainer>
      </ContentContainer>
    </Container>
  )
}

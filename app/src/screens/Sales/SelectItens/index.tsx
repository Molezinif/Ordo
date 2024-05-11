import { useItens } from '@/context/itensContext'
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { Container, ContentContainer, StockContentContainer } from './styles'
import { SelectItensFromStockCard } from '@/components/SelectItensFromStockCard'

export function SelectItensToSale({ navigation }: any) {

  return (
    <Container>
      <ContentContainer>
        <Text style={{ fontSize: 18, fontWeight: '300' }}>
          Selecione um item
        </Text>
        <StockContentContainer>
          <SelectItensFromStockCard
            navigateCallBack={() => {
              navigation.navigate('Main')
            }}
          />
        </StockContentContainer>
      </ContentContainer>
    </Container>
  )
}

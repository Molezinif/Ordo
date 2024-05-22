/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Container,
  ExpenditureHeaderLabel,
  MainContentContainer,
  TopBarContainer
} from './styles'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { ExpenditureSectionItem } from './Components/ExpenditureSectionItem'
import { getAverageMonthlyExpenditures } from '@/services/repositories/expenditure'

export function Expenditure({ navigation }: any) {
  const [averageMonthlyExpenditures, setAverageMonthlyExpenditures] =
    React.useState({
      averageInventoryCost: 0,
      averageVariableCost: 0,
      averageOtherCost: 0,
      averageTotalCost: 0
    })

  useEffect(() => {
    getAverageMonthlyExpenditures()
      .then((data) => {
        setAverageMonthlyExpenditures(data)
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
      })
  }, [])

  return (
    <Container>
      <TopBarContainer>
        <ExpenditureHeaderLabel>Despesas</ExpenditureHeaderLabel>
      </TopBarContainer>
      <MainContentContainer>
        <View style={{ display: 'flex', gap: 10 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20
            }}
          >
            <Text style={{ color: '#5F5F5F', fontWeight: 500 }}>
              Despesas médias mensais
            </Text>
            <Text style={{ color: '#5F5F5F', fontWeight: 500 }}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(averageMonthlyExpenditures.averageTotalCost)}
            </Text>
          </View>

          <ExpenditureSectionItem
            title={'Custo de estoque'}
            onClickAction={() =>
              navigation.navigate('InventoryCostExpenditure')
            }
            subtitle={'Produtos >'}
            value={Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(averageMonthlyExpenditures.averageInventoryCost)}
          />
          <ExpenditureSectionItem
            title={'Despesas variáveis'}
            onClickAction={() => navigation.navigate('VariablesExpenditure')}
            subtitle={'Serviços, manutenções >'}
            value={Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(averageMonthlyExpenditures.averageVariableCost)}
          />
          <ExpenditureSectionItem
            title={'Outros'}
            onClickAction={() => navigation.navigate('OtherExpenditures')}
            subtitle={'Outras despesas >'}
            value={Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(averageMonthlyExpenditures.averageOtherCost)}
          />
        </View>
      </MainContentContainer>
    </Container>
  )
}

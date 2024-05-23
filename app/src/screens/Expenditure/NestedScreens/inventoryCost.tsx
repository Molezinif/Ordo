/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Container,
  ExpenditureHeaderLabel,
  MainContentContainer,
  TopBarContainer
} from './styles'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { getProductsTransactions } from '@/services/repositories/transactions'
import {
  ExpenditureGroup,
  IExpenditureGroupProps
} from '../Components/ExpenditureGroup'
import { ExpenditureGroupSkeleton } from '../Components/skeleton/ExpenditureGroup'

export function InventoryCostExpenditure({ navigation }: any) {
  const mockGroup = [
    {
      month: 'MAIO 2024'
    },
    {
      month: 'ABRIL 2024'
    },
    {
      month: 'MARÇO 2024'
    }
  ]

  const [groupData, setGroupData] = React.useState<IExpenditureGroupProps[]>([])

  useEffect(() => {
    getProductsTransactions()
      .then((data: any) => {
        setGroupData(data)
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
      })
  }, [])

  return (
    <Container>
      <TopBarContainer>
        <ExpenditureHeaderLabel>Entrada de estoque</ExpenditureHeaderLabel>
      </TopBarContainer>
      <MainContentContainer>
        <View style={{ display: 'flex', gap: 40 }}>
          {groupData.length ? (
            <>
              {groupData.map((group) => {
                return (
                  <ExpenditureGroup
                    key={group.groupMonthDetails.month}
                    groupMonthDetails={group.groupMonthDetails}
                    itens={group.itens}
                  />
                )
              })}
            </>
          ) : (
            <>
              {mockGroup.map((group) => {
                return (
                  <ExpenditureGroupSkeleton
                    key={group.month}
                    groupMonthDetails={group}
                  />
                )
              })}
            </>
          )}
        </View>
      </MainContentContainer>
    </Container>
  )
}

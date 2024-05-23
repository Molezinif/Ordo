import {
  CardContainer,
  ItemContainer,
  ItemInfos,
  LeftItemInfos,
  CardTextInfo,
  RightItemInfos,
  ScrollContentContainer
} from './styles'
import React from 'react'
import { View, Text } from 'native-base'
import { CardTitle } from '../ClientCard/styles'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { ETransactionOrigin } from '@/services/repositories/transactions'

export function Item({ item }: any) {
  return (
    <ItemContainer>
      <LeftItemInfos>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
          }}
        >
          <ItemInfos>
            <FontAwesome6
              solid
              name={
                item.type === ETransactionOrigin.inventoryReceipt
                  ? 'caret-down'
                  : 'caret-up'
              }
              size={25}
              color={
                item.type === ETransactionOrigin.inventoryReceipt
                  ? '#ff0011'
                  : 'green'
              }
            />
            <View>
              <CardTextInfo>{`Data: ${item?.date as string}`}</CardTextInfo>
              <Text>{`Hora: ${item.hour}`}</Text>
            </View>
          </ItemInfos>
        </View>
      </LeftItemInfos>
      <RightItemInfos>
        <CardTextInfo>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(item?.total)}
        </CardTextInfo>
      </RightItemInfos>
    </ItemContainer>
  )
}

export function HistoryCard({ historyItens }: any) {
  if (!historyItens) {
    const mock = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
      <CardContainer>
        <CardTitle>Vendas recentes</CardTitle>

        <ScrollContentContainer
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ display: 'flex', gap: 10 }}>
            {mock.map((_, index) => {
              return (
                <View
                  style={{
                    width: '100%',
                    height: 40,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 8
                  }}
                  key={index}
                />
              )
            })}
          </View>
        </ScrollContentContainer>
      </CardContainer>
    )
  }

  return (
    <CardContainer>
      <CardTitle>Atividade Recente</CardTitle>

      <ScrollContentContainer
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {historyItens?.map((item, index) => {
          return (
            <Item
              key={index}
              item={{
                type: item.type,
                date: item.transactionDate,
                hour: item.transactionHour,
                total: item?.value
              }}
            />
          )
        })}
      </ScrollContentContainer>
    </CardContainer>
  )
}

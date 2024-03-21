import {
  CardView,
  CardContainer,
  ItemContainer,
  ItemImage,
  ItemInfos,
  LeftItemInfos,
  CardTextInfo,
  RightItemInfos,
  ScrollContentContainer
} from './styles'
import React from 'react'
import { View } from 'native-base'
import { CardTitle } from '../ClientCard/styles'

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
          <ItemImage />
          <ItemInfos>
            <CardTextInfo>{item?.client}</CardTextInfo>
            <CardTextInfo>{`Data: ${item?.saleDate as string}`}</CardTextInfo>
          </ItemInfos>
        </View>
      </LeftItemInfos>
      <RightItemInfos>
        <CardTextInfo>{`R$${item?.total as string}`}</CardTextInfo>
      </RightItemInfos>
    </ItemContainer>
  )
}

export function HistoryCard({ historyItens }: any) {
  return (
    <CardContainer>
      <CardTitle>Vendas recentes</CardTitle>
      <CardView hasContent={historyItens?.length}>
        <ScrollContentContainer>
          <View style={{ display: 'flex', gap: 10 }}>
            {historyItens?.map((item) => {
              const formattedDate = new Date(
                item.createdAt
              ).toLocaleDateString()
              return (
                <Item
                  key={item.saleHistoryUUID}
                  item={{
                    client: item?.client.name,
                    saleDate: formattedDate,
                    installment: item?.installment,
                    total: item?.total
                  }}
                />
              )
            })}
          </View>
        </ScrollContentContainer>
      </CardView>
    </CardContainer>
  )
}

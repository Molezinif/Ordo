import { Text, View } from 'react-native'
import {
  CardView,
  CardContainer,
  ItemContainer,
  ItemImage,
  ItemInfos,
  LeftItemInfos,
  RightItemInfos
} from './styles'
import React from 'react'

export function Item({ item }: any) {
  return (
    <ItemContainer>
      <LeftItemInfos>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <ItemImage />
          <ItemInfos>
            <Text>{item?.name}</Text>
            <Text>{`Código: ${item?.code as string}`}</Text>
          </ItemInfos>
        </View>
      </LeftItemInfos>
      <RightItemInfos>
        <ItemInfos>
          <Text style={{ fontSize: 18 }}>{`R$${
            item?.price?.toFixed(2) as string
          }`}</Text>
          <Text>{`qtde: ${item?.amount as string}`}</Text>
        </ItemInfos>
      </RightItemInfos>
    </ItemContainer>
  )
}

export function StockCard({ itens }: any) {
  return (
    <CardContainer>
      <CardView>
        {itens.map((item, index) => (
          <Item
            key={index}
            item={{
              name: item.productName,
              amount: item.quantity,
              price: item.sellingPrice,
              code: item.code
            }}
          />
        ))}
      </CardView>
    </CardContainer>
  )
}

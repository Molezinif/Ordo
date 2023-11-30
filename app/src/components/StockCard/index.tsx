import { View } from 'react-native'
import {
  CardView,
  CardContainer,
  ItemContainer,
  ItemImage,
  ItemInfos,
  LeftItemInfos,
  RightItemInfos,
  CardTextInfo
} from './styles'
import React from 'react'

export function Item({ item }: any) {
  return (
    <ItemContainer>
      <LeftItemInfos>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <ItemImage />
          <ItemInfos>
            <CardTextInfo>{item?.name}</CardTextInfo>
            <CardTextInfo>{`Código: ${item?.code as string}`}</CardTextInfo>
          </ItemInfos>
        </View>
      </LeftItemInfos>
      <RightItemInfos>
        <CardTextInfo textSize={'18px'}>{`R$${
          item?.price?.toFixed(2) as string
        }`}</CardTextInfo>
        <CardTextInfo>
          {`qtde: `}
          <CardTextInfo color={'#0ECD21'}>{item?.amount}</CardTextInfo>
        </CardTextInfo>
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

import { Text, TouchableOpacity, View } from 'react-native'
import {
  CardView,
  CardContainer,
  CardTitle,
  ItemContainer,
  ItemImage,
  ItemInfos,
  CardFooter,
  LeftItemInfos,
  RightItemInfos
} from './styles'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FontAwesome } from '@expo/vector-icons'

export function Item({ item }) {
  return (
    <ItemContainer>
      <LeftItemInfos>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <ItemImage />
          <ItemInfos>
            <Text>{item?.name}</Text>
            <Text>{`Código: ${item?.code}`}</Text>
          </ItemInfos>
        </View>
      </LeftItemInfos>
      <RightItemInfos>
        <ItemInfos>
          <Text style={{ fontSize: 18 }}>{`R$${item?.price.toFixed(2)}`}</Text>
          <Text>{`qtde: ${item?.amount}`}</Text>
        </ItemInfos>
      </RightItemInfos>
    </ItemContainer>
  )
}

export function StockCard({ itens }) {
  return (
    <CardContainer>
      <CardView>
        {itens.map((item) => (
          <Item
            key={item.id}
            item={{
              id: item.id,
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

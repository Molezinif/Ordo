import { Text, TouchableOpacity } from 'react-native'
import {
  CardView,
  CardContainer,
  ItemContainer,
  CardFooter,
  SubtotalText,
  ItemImage,
  ItemInfos
} from './styles'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign'
import { View } from 'native-base'
import { CardTitle } from '../ClientCard/styles'

export function Item({ item }: any) {
  return (
    <ItemContainer>
      <ItemImage />
      <ItemInfos>
        <Text>{item?.name}</Text>
        <Text>{`R$${parseFloat(item.value)?.toFixed(2)} (R$${parseFloat(
          item.value
        )?.toFixed(2)} x ${item.amount as string})`}</Text>
      </ItemInfos>
    </ItemContainer>
  )
}
export function Card({ title, itens }: any) {
  function calculateSubtotal(cart) {
    let subtotal = 0

    for (const item of cart) {
      const itemValue = parseFloat(item.value.replace(',', '.'))
      subtotal += itemValue * item.amount
    }

    return subtotal.toFixed(2)
  }

  const subtotal = calculateSubtotal(itens)
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardView>
        <View>
          {itens.map((item) => (
            <Item
              key={item.id}
              item={{
                id: item.id,
                name: item.name,
                value: item.value,
                amount: item.amount
              }}
            />
          ))}
        </View>
        <CardFooter>
          <SubtotalText>{`Sub-total: R$ ${subtotal}`}</SubtotalText>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="pluscircle"
              color={'#65B3FF'}
              size={30}
            />
          </TouchableOpacity>
        </CardFooter>
      </CardView>
    </CardContainer>
  )
}

import { Text, TouchableOpacity } from 'react-native'
import {
  CardView,
  CardContainer,
  ItemContainer,
  CardFooter,
  FooterText,
  ItemImage,
  ItemInfos
} from './styles'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign'
import { View } from 'native-base'
import { CardTitle } from '../ClientCard/styles'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'

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
export function Card({ title, itens, onPress, deleteItemCallBack }: any) {
  function calculateSubtotal(cart) {
    let subtotal = 0

    for (const item of cart) {
      const itemValue = parseFloat(item?.sellingPrice)
      const selectedQuantity = item?.selectedQuantity
      subtotal += itemValue * selectedQuantity
    }

    return subtotal.toFixed(2)
  }

  const subtotal = calculateSubtotal(itens)
  const renderLeftActions = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          width: '100%',
          alignItems: 'flex-start',
          backgroundColor: '#ff0000',
          borderRadius: 8
        }}
      >
        <TouchableOpacity style={{ marginLeft: 10 }}>
          <MaterialCommunityIcons name="delete" color={'white'} size={20} />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardView hasContent={itens?.length}>
        <View style={{ display: 'flex', gap: 10 }}>
          {itens?.map((item) => (
            <GestureHandlerRootView key={item.code} style={{ width: '100%' }}>
              <Swipeable
                renderLeftActions={renderLeftActions}
                shouldCancelWhenOutside
                onSwipeableOpen={() => {
                  deleteItemCallBack(item.code)
                }}
              >
                <Item
                  key={item.code}
                  item={{
                    id: item?.id,
                    name: item.productName,
                    value: item.sellingPrice,
                    amount: item?.selectedQuantity
                  }}
                />
              </Swipeable>
            </GestureHandlerRootView>
          ))}
        </View>
        <CardFooter>
          <FooterText isEmpty={itens.length}>
            {itens.length
              ? `Sub-total: R$ ${subtotal}`
              : 'Adicione itens ao carrinho'}
          </FooterText>
          <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons
              name="pluscircle"
              color={'#3789db'}
              size={30}
            />
          </TouchableOpacity>
        </CardFooter>
      </CardView>
    </CardContainer>
  )
}

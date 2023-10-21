import { Text, TouchableOpacity } from 'react-native'
import {
  CardView,
  CardContainer,
  CardTitle,
  ItemContainer,
  ItemImage,
  ItemInfos,
  CardFooter
} from './styles'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FontAwesome } from '@expo/vector-icons'

export function Item({ item }) {
  return (
    <ItemContainer>
      <FontAwesome name="user-circle" color={'#7C7C8A'} size={30} />
      <ItemInfos>
        <Text>{item?.name}</Text>
        <Text>{`CPF: ${item?.personalDocument}`}</Text>
      </ItemInfos>
    </ItemContainer>
  )
}

export function ClientCard({ title, itens }) {
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>
      <CardView>
        {itens.map((item) => (
          <Item
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              personalDocument: item.personalDocument
            }}
          />
        ))}
        {!itens?.length ? (
          <CardFooter>
            <Text style={{ color: '#7C7C8A' }}>Adicione um cliente</Text>
            <TouchableOpacity>
              <AntDesign name="pluscircle" color={'#65B3FF'} size={30} />
            </TouchableOpacity>
          </CardFooter>
        ) : (
          <></>
        )}
      </CardView>
    </CardContainer>
  )
}

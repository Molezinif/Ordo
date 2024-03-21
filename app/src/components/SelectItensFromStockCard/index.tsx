/* eslint-disable indent */
/* eslint-disable array-callback-return */
import { TouchableOpacity, View } from 'react-native'
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
import React, { useCallback, useEffect } from 'react'
import { Checkbox } from 'native-base'
import { useItens } from '@/context/itensContext'

export function Item({ item, isItensSelectable, checkBoxDisplay }: any) {
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
          {isItensSelectable && checkBoxDisplay ? (
            <Checkbox
              value="test"
              accessibilityLabel="This is a dummy checkbox"
            />
          ) : (
            <ItemImage />
          )}
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

export function SelectItensFromStockCard({
  itens,
  isItensSelectable,
  navigateCallBack
}: any) {
  const [checkBoxDisplay, setCheckBoxDisplay] = React.useState(false)
  const [stockItens, setStockItens] = React.useState([] as any)
  const { setSelectedItensToSell, selectedItensToSell } = useItens()

  useEffect(() => {
    const itensFormatted = itens.filter((item) => {
      const selectedItem = selectedItensToSell.find(
        (i: any) => i.code === item.code
      )
      const selectedQuantity = selectedItem?.selectedQuantity || 0

      return (
        item.quantity > selectedQuantity || item.quantity !== selectedQuantity
      )
    })

    setStockItens(itensFormatted)
  }, [itens, selectedItensToSell])

  const renderItens = useCallback(() => {
    return stockItens.map((item) => {
      return (
        <TouchableOpacity
          key={item.code}
          style={{ width: '100%' }}
          onLongPress={() => {
            setCheckBoxDisplay(true)
          }}
          onPress={
            isItensSelectable
              ? () => {
                  setSelectedItensToSell((prevState) => {
                    if (prevState.map((i: any) => i.code).includes(item.code)) {
                      return prevState.map((obj) => {
                        if (obj.code === item.code) {
                          return {
                            ...obj,
                            selectedQuantity: +obj.selectedQuantity + 1
                          }
                        }
                        return obj
                      })
                    }
                    const itemToAdd = {
                      ...item,
                      selectedQuantity: 1
                    }
                    return [...prevState, itemToAdd]
                  })
                  navigateCallBack()
                }
              : undefined
          }
        >
          <Item
            isItensSelectable={isItensSelectable}
            checkBoxDisplay={checkBoxDisplay}
            item={{
              name: item.productName,
              amount: item.quantity,
              price: item.sellingPrice,
              code: item.code
            }}
          />
        </TouchableOpacity>
      )
    })
  }, [
    checkBoxDisplay,
    isItensSelectable,
    navigateCallBack,
    setSelectedItensToSell,
    stockItens
  ])

  return (
    <CardContainer>
      <CardView>{renderItens()}</CardView>
    </CardContainer>
  )
}

/* eslint-disable indent */
/* eslint-disable array-callback-return */
import { TouchableOpacity, View, Text } from 'react-native'
import {
  CardView,
  CardContainer,
  ItemContainer,
  ItemImage,
  ItemInfos,
  LeftItemInfos,
  RightItemInfos,
  CardTextInfo,
  SearchInputContainer
} from './styles'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useEffect } from 'react'
import { Checkbox, Icon, Modal } from 'native-base'
import { useItens } from '@/context/itensContext'
import { CustomInput } from '../shared/CustomFuckingInput'
import { Controller, useForm } from 'react-hook-form'
import { BasicButton } from '../BasicButton'
import { NoResultsFoundComponent } from '../NoResultsFound'
import { AnimaterFlyPaperLoading } from '../AnimatedView'

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

export function SelectItensFromStockCard({ navigateCallBack }: any) {
  const [checkBoxDisplay, setCheckBoxDisplay] = React.useState(false)
  const [stockItens, setStockItens] = React.useState([] as any)
  const [showQuantityModal, setShowQuantityModal] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState({} as any)
  const [isLoading, setIsLoading] = React.useState(false)
  const {
    setSelectedItensToSell,
    selectedItensToSell,
    handleSearchStock,
    stockItems,
    handleGetStock,
    notFoundProducts
  } = useItens()

  const { control, getValues, setError, getFieldState, setValue, setFocus } =
    useForm()

  useEffect(() => {
    const data = async () => {
      await handleGetStock()
    }

    setIsLoading(true)
    void data()
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const itensFormattedQuantity = stockItems
      .filter((item) => {
        const selectedItem = selectedItensToSell.find(
          (i: any) => i.code === item.code
        )
        const selectedQuantity = selectedItem?.selectedQuantity || 0

        return (
          item.quantity > selectedQuantity || item.quantity !== selectedQuantity
        )
      })
      .map((item) => {
        const selectedItem = selectedItensToSell.find(
          (selected) => selected.code === item.code
        )
        const selectedQuantity = selectedItem?.selectedQuantity || 0

        return {
          ...item,
          quantity: Math.max(0, item.quantity - Number(selectedQuantity))
        }
      })

    setStockItens(itensFormattedQuantity)
  }, [stockItems, selectedItensToSell])

  useEffect(() => {
    if (showQuantityModal) {
      setFocus('selectedQuantity')
    }
  }, [showQuantityModal])

  const renderItens = useCallback(() => {
    return stockItens.map((item) => {
      return (
        <TouchableOpacity
          key={item.code}
          style={{ width: '100%' }}
          onPress={() => {
            setSelectedItem(item)
            setShowQuantityModal(true)
          }}
        >
          <Item
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
  }, [checkBoxDisplay, navigateCallBack, setSelectedItensToSell, stockItens])

  const handleInsertItem = () => {
    const selectedQuantity = getValues('selectedQuantity')

    const quantityIsInvalid = getFieldState('selectedQuantity')?.error?.message

    if (quantityIsInvalid) {
      return
    }

    if (selectedQuantity && selectedItem) {
      setSelectedItensToSell((prevState) => {
        if (prevState.map((i: any) => i.code).includes(selectedItem.code)) {
          return prevState.map((obj) => {
            if (obj.code === selectedItem.code) {
              return {
                ...obj,
                selectedQuantity:
                  +obj.selectedQuantity + Number(selectedQuantity)
              }
            }

            return obj
          })
        }

        const itemToAdd = {
          ...selectedItem,
          quantity: selectedItem.quantity - Number(selectedQuantity),
          selectedQuantity: Number(selectedQuantity)
        }

        return [...prevState, itemToAdd]
      })
      setShowQuantityModal(false)
      navigateCallBack()
    }
  }

  return (
    <CardContainer>
      <SearchInputContainer>
        <Controller
          name="selectItemSearchInput"
          control={control}
          render={({ field }) => {
            return (
              <CustomInput
                {...field}
                onChange={(e) => {
                  field.onChange(e)
                  handleSearchStock(e)
                }}
                borderRadius={'8'}
                icon={
                  <Icon
                    as={<MaterialIcons name="search" />}
                    size={'md'}
                    ml={'3'}
                    bg={'white'}
                  />
                }
                placeholder="Pesquisar"
                error={''}
                type="default"
              />
            )
          }}
        />
      </SearchInputContainer>
      <CardView>
        {isLoading && <AnimaterFlyPaperLoading />}
        {notFoundProducts && !isLoading && (
          <View style={{ marginTop: 120 }}>
            <NoResultsFoundComponent />
          </View>
        )}
        {!notFoundProducts && !isLoading && renderItens()}
      </CardView>
      <Modal
        isOpen={showQuantityModal}
        onClose={() => {
          setValue('selectedQuantity', '1')
          setError('selectedQuantity', {})
          setShowQuantityModal(false)
        }}
        useRNModal={true}
      >
        <Modal.Content maxWidth="800px">
          <Modal.CloseButton />
          <Modal.Body>
            <View style={{ display: 'flex', gap: 15, marginTop: 5 }}>
              <Text style={{ fontWeight: '600', fontSize: 14 }}>
                Quantidade
              </Text>
              <View style={{ display: 'flex', gap: 15 }}>
                <Controller
                  control={control}
                  defaultValue={'1'}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <CustomInput
                        {...field}
                        value={field.value}
                        onChange={(text) => {
                          field.onChange(text)
                          const noItemsSelected = !text || Number(text) <= 0
                          const quantitySelectedIsGreaterThanAvailable =
                            text && Number(text) > selectedItem.quantity

                          if (noItemsSelected) {
                            setError('selectedQuantity', {
                              message: 'Selecione pelo menos um item'
                            })
                          }

                          if (quantitySelectedIsGreaterThanAvailable) {
                            setError('selectedQuantity', {
                              message: 'Quantidade indisponível'
                            })
                          }

                          if (
                            !noItemsSelected &&
                            !quantitySelectedIsGreaterThanAvailable
                          ) {
                            setError('selectedQuantity', {})
                          }
                        }}
                        placeholder="Insira a quantidade do produto"
                        keyboardType={'number-pad'}
                        type="numeric"
                        error={error?.message}
                      />
                    )
                  }}
                  name="selectedQuantity"
                />
                <BasicButton
                  onPress={() => {
                    handleInsertItem()
                  }}
                  text="Inserir"
                  size="sm"
                  width="100%"
                />
              </View>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </CardContainer>
  )
}

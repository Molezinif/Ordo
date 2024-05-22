/* eslint-disable no-unreachable-loop */
import { ClientCard } from '@/components/ClientCard'
import {
  ButtonContainer,
  Container,
  ContentContainer,
  DiscountError,
  DiscountInfo,
  DiscountInfoContainer,
  DiscountListContainer,
  ScrollView
} from './styles'
import { Card } from '@/components/SaleCard'
import { Icon, Input, Modal, View } from 'native-base'
import { CardTitle } from '@/components/ClientCard/styles'
import { ToggleContainer } from '../Dashboard/styles'
import { BasicButton, ToggleButton } from '@/components'
import React, { useCallback, useEffect } from 'react'
import { useItens } from '@/context/itensContext'
import { SaleDetailsCard } from '@/components/SaleDetailsCard'
import { TouchableOpacity, Text } from 'react-native'
import { postCurrentSale } from '@/services/repositories/sales'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useAuth } from '@/context/auth'
import { useNavigation, CommonActions } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

const mockClients = [
  {
    id: 1,
    name: 'Gabriel Molezini',
    personalDocument: '999.999.999-99'
  }
]

export function Sales() {
  const navigation = useNavigation()

  const navigateToSelectItens = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'SelectItensToSale'
      })
    )
  }

  const { user } = useAuth()

  const [showModal, setShowModal] = React.useState(false)

  const [showErrorModal, setShowErrorModal] = React.useState(false)

  const [installment, setInstallment] = React.useState(1)

  const [discount, setDiscount] = React.useState('0')

  const { selectedItensToSell, setSelectedItensToSell, handleGetSalesHistory } =
    useItens()

  const toggleRef = React.useRef<any>(null)

  function calculateTotal(cart) {
    let subtotal = 0

    if (cart?.length === 0) return subtotal

    for (const item of cart) {
      const itemValue = parseFloat(item?.sellingPrice)
      const selectedQuantity = item?.selectedQuantity
      subtotal += itemValue * selectedQuantity
    }

    const total =
      subtotal - (discount ? parseFloat(discount) : 0) < 0
        ? 0
        : subtotal - (discount ? parseFloat(discount) : 0)

    return total.toFixed(2)
  }

  const getDiscountList = () => {
    const result = [] as any
    const maxInstallments = 10
    for (let i = 1; i < maxInstallments; i++) {
      const value = +calculateTotal(selectedItensToSell) / i
      if (value !== 0) {
        result.push({
          installment: i,
          value
        })
      }
    }
    return result
  }

  const renderDiscountList = () => {
    const discountList = getDiscountList()
    return (
      <DiscountListContainer>
        {discountList?.length ? (
          discountList.map((item) => (
            <TouchableOpacity
              key={item.installment}
              onPress={() => {
                setInstallment(item.installment)
                setShowModal(false)
              }}
            >
              <DiscountInfoContainer>
                <DiscountInfo>{`${item?.installment as string}X`}</DiscountInfo>
                <DiscountInfo>{`R$${
                  item?.value.toFixed(2) as string
                }`}</DiscountInfo>
              </DiscountInfoContainer>
            </TouchableOpacity>
          ))
        ) : (
          <DiscountInfoContainer>
            <DiscountError>
              Selecione pelo menos um item para ver as parcelas disponíveis
              desta venda
            </DiscountError>
          </DiscountInfoContainer>
        )}
      </DiscountListContainer>
    )
  }

  const renderSaleDetails = useCallback(() => {
    return (
      <>
        <CardTitle>Detalhes da venda</CardTitle>
        <SaleDetailsCard
          details={{
            installment,
            discount: discount ? parseFloat(discount) : 0,
            total: calculateTotal(selectedItensToSell)
          }}
        />
      </>
    )
  }, [installment, selectedItensToSell, discount])

  const handleFinishSale = async () => {
    if (selectedItensToSell.length === 0) {
      setShowErrorModal(true)
      return
    }
    const sale = {
      userUID: user?.uid,
      itens: selectedItensToSell,
      installment,
      discount,
      total: calculateTotal(selectedItensToSell)
    }

    await postCurrentSale(sale)

    await handleGetSalesHistory()

    setSelectedItensToSell([])
    setDiscount('0')
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Success',
        params: {
          message: 'Venda finalizada com sucesso!',
          screenToNavigate: 'Dashboard'
        }
      })
    )
  }

  useEffect(() => {
    if (selectedItensToSell.length === 0) {
      setInstallment(1)
      toggleRef?.current?.selectOption('optionOne')
    }
  }, [selectedItensToSell])

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <ContentContainer>
          <Card
            title={'Itens'}
            itens={selectedItensToSell}
            onPress={navigateToSelectItens}
            deleteItemCallBack={(code?: string) => {
              setSelectedItensToSell(
                selectedItensToSell.filter((item) => item.code !== code)
              )
            }}
          />

          <View style={{ display: 'flex', gap: 18 }}>
            <CardTitle>Desconto</CardTitle>
            <View>
              <Input
                keyboardType={'numeric'}
                borderRadius={'8'}
                size={'md'}
                width={'55%'}
                placeholder={'Insira o desconto'}
                bgColor={'white'}
                value={discount}
                onChangeText={(e) => {
                  setDiscount(e)
                }}
                autoCapitalize="none"
                InputRightElement={
                  <Icon
                    color={'#b4b4b4'}
                    marginRight={2}
                    as={<FontAwesome6 name="brazilian-real-sign" size={14} />}
                  />
                }
              />
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              gap: 20
            }}
          >
            <CardTitle>Pagamento Parcelado?</CardTitle>
            <ToggleContainer>
              <ToggleButton
                ref={toggleRef}
                optionOneOnPress={() => {
                  setInstallment(1)
                }}
                optionTwoOnPress={() => {
                  setShowModal(true)
                }}
                optionOneText="Não"
                optionTwoText="Sim"
              />
            </ToggleContainer>

            <Modal
              isOpen={showModal}
              onClose={() => {
                setShowModal(false)
                setInstallment(1)
                toggleRef?.current?.selectOption('optionOne')
              }}
              useRNModal={true}
            >
              <Modal.Content maxWidth="600px">
                <Modal.CloseButton />
                <Modal.Header>Selecione uma parcela</Modal.Header>
                <Modal.Body>{renderDiscountList()}</Modal.Body>
              </Modal.Content>
            </Modal>

            {renderSaleDetails()}

            <Modal
              isOpen={showErrorModal}
              onClose={() => {
                setShowErrorModal(false)
              }}
              useRNModal={true}
            >
              <Modal.Content maxWidth="600px">
                <Modal.CloseButton />
                <Modal.Body>
                  <MaterialCommunityIcons />
                  <View
                    style={{
                      display: 'flex',
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 20,
                      gap: 20
                    }}
                  >
                    <MaterialCommunityIcons
                      name="alert"
                      size={60}
                      color="#F3BE1D"
                    />
                    <Text style={{ textAlign: 'center' }}>
                      Selecione ao menos um item para finalizar a venda
                    </Text>
                  </View>
                </Modal.Body>
              </Modal.Content>
            </Modal>
            <ButtonContainer>
              <BasicButton
                onPress={async () => {
                  await handleFinishSale()
                }}
                text="Finalizar venda"
                size="md"
                width="50%"
              />
            </ButtonContainer>
          </View>
        </ContentContainer>
      </ScrollView>
    </Container>
  )
}

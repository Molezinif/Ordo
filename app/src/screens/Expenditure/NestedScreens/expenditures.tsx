/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Container,
  ExpenditureHeaderLabel,
  InputTitle,
  MainContentContainer,
  ModalTitle,
  TopBarContainer
} from './styles'
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import {
  ExpenditureGroup,
  IExpenditureGroupProps
} from '../Components/ExpenditureGroup'
import { ExpenditureGroupSkeleton } from '../Components/skeleton/ExpenditureGroup'
import {
  EExpenditureType,
  deleteExpenditure,
  editExpenditure,
  getExpenditures
} from '@/services/repositories/expenditure'
import {
  Button,
  FormControl,
  Input,
  Modal,
  WarningOutlineIcon
} from 'native-base'
import { BasicButton } from '@/components'
import { useExpenditure } from '../hook'
import Toast from 'react-native-toast-message'

export function Expenditures({ navigation }: any) {
  const mockGroup = [
    {
      month: 'MAIO 2024'
    },
    {
      month: 'ABRIL 2024'
    },
    {
      month: 'MARÇO 2024'
    }
  ]

  const modalDefaultValue = {
    name: '',
    value: '',
    expenditureUUID: '',
    dateObj: undefined,
    error: {
      name: '',
      value: ''
    }
  }

  const modalPropsDefaultValue = {
    showModal: false,
    month: '',
    isEditing: false,
    dateObj: new Date()
  }

  const { handleMakeExpenditure } = useExpenditure()

  const [modalProps, setModalProps] = React.useState(modalPropsDefaultValue)
  const [groupData, setGroupData] = React.useState<IExpenditureGroupProps[]>([])

  const [modalData, setModalData] = React.useState<{
    name: string
    value: string
    expenditureUUID: string
    error: {
      name: string
      value: string
    }
  }>(modalDefaultValue)

  const handleGetExpenditures = () => {
    getExpenditures({ type: EExpenditureType.variable })
      .then((data: any) => {
        setGroupData(data)
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
      })
  }

  const showToast = ({ message }: any) => {
    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: message,
      visibilityTime: 5000
    })
  }

  const onSubmitModal = async (data) => {
    try {
      const { name, value } = data

      if (!name) {
        setModalData({
          ...modalData,
          error: {
            ...modalData.error,
            name: 'Nome é obrigatório'
          }
        })
      }

      if (!value) {
        setModalData({
          ...modalData,
          error: {
            ...modalData.error,
            value: 'Valor é obrigatório'
          }
        })
      }

      if (!name || !value) return

      handleMakeExpenditure({
        name,
        value: parseFloat(value.replace(',', '.')),
        expenditureDate: modalProps.dateObj,
        type: EExpenditureType.variable
      })

      handleGetExpenditures()

      showToast({
        message: `Despesa criada com sucesso!`
      })

      setModalProps(modalPropsDefaultValue)
    } catch {
      setModalProps(modalPropsDefaultValue)
    }
  }

  const onDeleteItemOnModal = async (expenditureUUID) => {
    try {
      await deleteExpenditure(expenditureUUID)

      handleGetExpenditures()

      showToast({
        message: `Despesa excluída com sucesso!`
      })

      setModalProps(modalPropsDefaultValue)
    } catch {
      setModalProps(modalPropsDefaultValue)
    }
  }

  const onEditItemOnModal = async (expenditureUUID, data) => {
    try {
      await editExpenditure(expenditureUUID, data)

      handleGetExpenditures()

      showToast({
        message: `Despesa editada com sucesso!`
      })

      setModalProps(modalPropsDefaultValue)
    } catch {
      setModalProps(modalPropsDefaultValue)
    }
  }

  useEffect(() => {
    handleGetExpenditures()
  }, [])

  return (
    <>
      <Modal
        isOpen={modalProps.showModal}
        onClose={() => {
          setModalProps(modalPropsDefaultValue)
          setModalData(modalDefaultValue)
        }}
        useRNModal={true}
      >
        <Modal.Content width={'80'}>
          <Modal.CloseButton />
          <Modal.Body width={'full'}>
            <View style={{ display: 'flex', gap: 24 }}>
              <View style={{ display: 'flex', gap: 6 }}>
                <ModalTitle>
                  {modalProps.isEditing ? 'Editar Despesa' : 'Inserir Despesa'}
                </ModalTitle>
                <Text style={{ color: '#979797' }}>{modalProps.month}</Text>
              </View>

              <View style={{ display: 'flex', gap: 20, width: '100%' }}>
                <View style={{ display: 'flex', gap: 10, width: '100%' }}>
                  <InputTitle>Nome</InputTitle>
                  <FormControl
                    isInvalid={!!modalData.error.name}
                    w="100%"
                    maxW="300px"
                  >
                    <Input
                      value={modalData.name}
                      onChangeText={(text) => {
                        setModalData({
                          ...modalData,
                          error: {
                            ...modalData.error,
                            name: ''
                          },
                          name: text
                        })
                      }}
                      keyboardType={'default'}
                      borderRadius={'8'}
                      size={'lg'}
                      width={'100%'}
                      placeholder={'Insira o nome'}
                      bgColor={'white'}
                      autoCapitalize="none"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {modalData.error.name}
                    </FormControl.ErrorMessage>
                  </FormControl>
                </View>

                <View style={{ display: 'flex', gap: 10, width: '100%' }}>
                  <InputTitle>Valor</InputTitle>
                  <FormControl
                    isInvalid={!!modalData.error.value}
                    w="100%"
                    maxW="300px"
                  >
                    <Input
                      value={modalData.value}
                      onChangeText={(text) => {
                        setModalData({
                          ...modalData,
                          error: {
                            ...modalData.error,
                            value: ''
                          },
                          value: text
                        })
                      }}
                      keyboardType={'numeric'}
                      borderRadius={'8'}
                      size={'lg'}
                      placeholder={'Insira o valor'}
                      bgColor={'white'}
                      autoCapitalize="none"
                    />
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {modalData.error.value}
                    </FormControl.ErrorMessage>
                  </FormControl>
                </View>
                {modalProps.isEditing ? (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      gap: 8,
                      justifyContent: 'space-between'
                    }}
                  >
                    <Button
                      onPress={() =>
                        onDeleteItemOnModal(modalData.expenditureUUID)
                      }
                      variant="outline"
                      colorScheme={'danger'}
                      _text={{ fontSize: 16, fontWeight: 'bold' }}
                      width={'48%'}
                      borderRadius={10}
                    >
                      {'Excluir'}
                    </Button>
                    <BasicButton
                      text="Editar"
                      width="48%"
                      onPress={() =>
                        onEditItemOnModal(modalData.expenditureUUID, {
                          name: modalData.name,
                          value: parseFloat(modalData.value.replace(',', '.'))
                        })
                      }
                    />
                  </View>
                ) : (
                  <BasicButton
                    text="Inserir"
                    onPress={() => onSubmitModal(modalData)}
                  />
                )}
              </View>
            </View>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Container>
        <TopBarContainer>
          <ExpenditureHeaderLabel>Despesas</ExpenditureHeaderLabel>
        </TopBarContainer>
        <MainContentContainer showsVerticalScrollIndicator={false}>
          <View style={{ display: 'flex', gap: 40 }}>
            {groupData.length ? (
              <>
                {groupData.map((group) => {
                  return (
                    <ExpenditureGroup
                      key={group.groupMonthDetails.month}
                      addActionCallBack={() => {
                        setModalData(modalDefaultValue)
                        setModalProps({
                          showModal: true,
                          month: group.groupMonthDetails.month,
                          dateObj:
                            group.groupMonthDetails.dateObj ?? new Date(),
                          isEditing: false
                        })
                      }}
                      itemActionCallBack={(item) => {
                        setModalData({
                          ...modalData,
                          expenditureUUID: item.expenditureUUID,
                          name: item.name,
                          value: item.value.toString()
                        })

                        setModalProps({
                          showModal: true,
                          month: group.groupMonthDetails.month,
                          dateObj: item.expenditureDate ?? new Date(),
                          isEditing: true
                        })
                      }}
                      groupMonthDetails={group.groupMonthDetails}
                      itens={group.itens}
                    />
                  )
                })}
              </>
            ) : (
              <>
                {mockGroup.map((group) => {
                  return (
                    <ExpenditureGroupSkeleton
                      key={group.month}
                      groupMonthDetails={group}
                    />
                  )
                })}
              </>
            )}
          </View>
        </MainContentContainer>
      </Container>
    </>
  )
}

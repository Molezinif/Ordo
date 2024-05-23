import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from 'react-hook-form'
import { ButtonWrapper, Form, Header, Title, TitleText } from './styles'
import { BasicButton } from '@/components/BasicButton'
import { useItens } from '@/context/itensContext'
import { CustomInput } from '@/components/shared/CustomFuckingInput'
import { registerProduct } from '@/services/repositories/itens/registerProduct'

import Toast from 'react-native-toast-message'
import { editProduct } from '@/services/repositories/itens/editProduct'

interface ItemRegisterToast {
  message: string
}

function generateMixedCode(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function ItensRegister({ navigation, route }: any) {
  const { control, handleSubmit, setValue } = useForm()
  const { handleGetStock, setTriggerTransaction } = useItens()

  let itemToEdit
  if (route?.params?.itemToEdit) {
    itemToEdit = route.params.itemToEdit
  }

  useEffect(() => {
    if (itemToEdit) {
      setValue('item', {
        ...itemToEdit,
        quantityBeforeEdit: itemToEdit.quantity,
        costPrice: itemToEdit?.costPrice.toString(),
        sellingPrice: itemToEdit.sellingPrice.toString()
      })
    }
  }, [])

  const showToast = ({ message }: ItemRegisterToast) => {
    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: message,
      visibilityTime: 5000
    })
  }

  const onSubmit = async (data) => {
    try {
      if (!itemToEdit) {
        await registerProduct(data)
        await handleGetStock()
        navigation.goBack()

        showToast({
          message: `Produto criado com sucesso!`
        })
        return data
      }
      await editProduct(data)
      await handleGetStock()
      navigation.goBack()
      setTriggerTransaction(true)

      showToast({
        message: `Produto alterado com sucesso!`
      })
      return data
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  useEffect(() => {
    if (!itemToEdit) {
      setValue('item.code', generateMixedCode(10))
    }
  }, [])

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      style={{
        flex: 1,
        backgroundColor: 'white'
      }}
    >
      <Header>
        <TouchableOpacity onPress={() => navigation.goBack()} />
        <Title>
          <TitleText>{`${
            itemToEdit ? 'Editar produto' : 'Novo Produto'
          }`}</TitleText>
        </Title>
      </Header>
      <Form>
        <Controller
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomInput
              {...field}
              placeholder="Insira o nome do produto"
              InputTitle="Nome do produto:"
              type="default"
              error={error?.message}
            />
          )}
          name="item.productName"
          rules={{ required: 'Nome do produto é obrigatório' }}
        />
        <Controller
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomInput
              {...field}
              defaultValue={itemToEdit?.quantity.toString() ?? '1'}
              value={field.value ?? '1'}
              placeholder="Insira a quantidade do produto"
              InputTitle="Quantidade:"
              keyboardType={'number-pad'}
              type="numeric"
              error={error?.message}
            />
          )}
          name="item.quantity"
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            width: '100%'
          }}
        >
          <View
            style={{
              width: '48.5%'
            }}
          >
            <Controller
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomInput
                  {...field}
                  placeholder="R$"
                  InputTitle="Preço de custo:"
                  type="default"
                  keyboardType={'numeric'}
                  error={error?.message}
                />
              )}
              name="item.costPrice"
              rules={{ required: 'Preço de custo obrigatório' }}
            />
          </View>
          <View
            style={{
              width: '48.5%'
            }}
          >
            <Controller
              control={control}
              render={({ field, fieldState: { error } }) => (
                <CustomInput
                  {...field}
                  placeholder="R$"
                  InputTitle="Preço de venda:"
                  type="default"
                  keyboardType={'numeric'}
                  error={error?.message}
                />
              )}
              name="item.sellingPrice"
              rules={{ required: 'Preço de venda obrigatório' }}
            />
          </View>
        </View>
        {/* <Controller
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomInput
              {...field}
              onChange={(text) => {
                if (text.length < 8) {
                  const formattedDate = handleDateChange(text)
                  field.onChange(formattedDate)
                }

                const regex = new RegExp(/(0[1-9]|1[0-2])\/\d{4}$/)

                if (!regex.test(text)) {
                  setError(field.name, {
                    message: 'Data inválida'
                  })
                } else {
                  setError(field.name, {})
                }
              }}
              value={field.value}
              placeholder="mm/aaaa"
              InputTitle="Validade:"
              type="numeric"
              keyboardType={'number-pad'}
              error={error?.message}
            />
          )}
          name="item.expiryDate"
          rules={{ required: 'Validade é obrigatória' }}
        /> */}
        <Controller
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomInput
              {...field}
              placeholder="Insira a marca do produto"
              InputTitle="Marca:"
              type="default"
              error={error?.message}
            />
          )}
          name="item.brand"
        />
        <Controller
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomInput
              {...field}
              placeholder="Insira a categoria do produto"
              InputTitle="Categoria:"
              type="default"
              error={error?.message}
            />
          )}
          name="item.category"
        />
        <Controller
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomInput
              {...field}
              placeholder="Insira um código aqui"
              InputTitle="Código:"
              type="default"
              error={error?.message}
            />
          )}
          name="item.code"
          rules={{ required: 'Código é obrigatório' }}
        />
        <ButtonWrapper>
          <BasicButton
            onPress={handleSubmit(onSubmit)}
            text={itemToEdit ? 'Editar' : 'Cadastrar'}
            width="50%"
            size="md"
          />
        </ButtonWrapper>
      </Form>
    </KeyboardAwareScrollView>
  )
}

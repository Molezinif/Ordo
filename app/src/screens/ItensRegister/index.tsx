import React, { useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from 'react-hook-form'
import { ButtonWrapper, Form, Header, Title, TitleText } from './styles'
import { BasicButton } from '@/components/BasicButton'
import { useItens } from '@/context/itensContext'
import { CustomInput } from '@/components/shared/CustomFuckingInput'
import { editProduct, registerProduct } from '@/services/repositories/itens'
import Toast from 'react-native-toast-message'

interface ItemRegisterToast {
  message: string
}

export function ItensRegister({ navigation, route }: any) {
  const { control, handleSubmit, setValue } = useForm()
  const { handleGetStock } = useItens()

  let itemToEdit
  if (route?.params?.itemToEdit) {
    itemToEdit = route.params.itemToEdit
  }

  useEffect(() => {
    if (itemToEdit) {
      setValue('item', {
        ...itemToEdit,
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
      showToast({
        message: `Produto alterado com sucesso!`
      })
      return data
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  const handleDateChange = (inputValue: string) => {
    if (inputValue.length > 2 && inputValue.charAt(2) !== '/') {
      inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2)
    }

    inputValue = inputValue.slice(0, 7)
    return inputValue
  }

  return (
    <KeyboardAwareScrollView
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
        <Controller
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomInput
              {...field}
              onChange={(text) => {
                console.log(text.length < 8)
                if (text.length < 8) {
                  const formattedDate = handleDateChange(text)
                  field.onChange(formattedDate)
                }
              }}
              value={field.value}
              placeholder="mm/aaaa"
              InputTitle="Validade:"
              type="numeric"
              keyboardType={'numeric'}
              error={error?.message}
            />
          )}
          name="item.expiryDate"
          rules={{ required: 'Validade é obrigatória' }}
        />
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

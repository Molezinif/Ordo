import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from 'react-hook-form'
import { ButtonWrapper, Form, Header, Title, TitleText } from './styles'
import { BasicButton } from '@/components/BasicButton'
import { useItens } from '@/context/itensContext'
import { CustomInput } from '@/components/shared/CustomFuckingInput'
import { registerProduct } from '@/services/repositories/itens'

export function ItensRegister({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { handleGetStock } = useItens()

  const onSubmit = async (data) => {
    try {
      await registerProduct(data)
      await handleGetStock()
      navigation.goBack()
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
          <TitleText>Cadastro de produto</TitleText>
        </Title>
      </Header>
      <Form>
        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              placeholder="Insira um código aqui"
              InputTitle="Código:"
              type="default"
              error={errors.code?.message}
            />
          )}
          name="code"
          rules={{ required: 'Código é obrigatório' }}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              placeholder="Insira o nome do produto"
              InputTitle="Nome do produto:"
              type="default"
              error={errors.productName?.message}
            />
          )}
          name="productName"
          rules={{ required: 'Nome do produto é obrigatório' }}
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
              render={({ field }) => (
                <CustomInput
                  {...field}
                  placeholder="R$"
                  InputTitle="Preço de custo:"
                  type="numeric"
                  error={errors.costPrice?.message}
                />
              )}
              name="costPrice"
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
              render={({ field }) => (
                <CustomInput
                  {...field}
                  placeholder="R$"
                  InputTitle="Preço de venda:"
                  type="numeric"
                  error={errors.sellingPrice?.message}
                />
              )}
              name="sellingPrice"
              rules={{ required: 'Preço de venda obrigatório' }}
            />
          </View>
        </View>
        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              onChange={(text) => {
                const formattedDate = handleDateChange(text)
                field.onChange(formattedDate)
              }}
              value={field.value}
              placeholder="mm/aaaa"
              InputTitle="Validade:"
              type="numeric"
              error={errors.expiryDate?.message}
            />
          )}
          name="expiryDate"
          rules={{ required: 'Validade é obrigatória' }}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              placeholder="Insira a marca do produto"
              InputTitle="Marca:"
              type="default"
              error={errors.brand?.message}
            />
          )}
          name="brand"
        />
        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              defaultValue="1"
              placeholder=""
              InputTitle="Quantidade:"
              type="numeric"
            />
          )}
          name="quantity"
        />
        <ButtonWrapper>
          <BasicButton
            onPress={handleSubmit(onSubmit)}
            text="Cadastrar"
            width="50%"
            size="md"
          />
        </ButtonWrapper>
      </Form>
    </KeyboardAwareScrollView>
  )
}

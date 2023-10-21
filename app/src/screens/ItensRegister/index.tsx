import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm } from 'react-hook-form'
import { ButtonWrapper, Form, Header, Title, TitleText, Input } from './styles'
import { BasicButton } from '@/components/BasicButton'
import { CustomInput } from '@/components/shared/CustomFuckingInput'
import { ItensRepository } from '@/services/Repositories/itens'
import { useItens } from '@/context/itensContext'

export function ItensRegister({ navigation }) {
  const { control, handleSubmit } = useForm()
  const { handleGetStock } = useItens()

  const stockRepo = new ItensRepository()

  const onSubmit = async (data) => {
    try {
      await stockRepo.postItens(data)
      handleGetStock()
      navigation.goBack()
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
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
        <CustomInput
          control={control}
          name="code"
          placeholder="Insira um código aqui"
          InputTitle="Código:"
          type="default"
        />
        <CustomInput
          control={control}
          name="productName"
          placeholder="Insira o nome do produto"
          InputTitle="Nome do produto:"
          type="default"
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
            <CustomInput
              control={control}
              name="costPrice"
              placeholder="R$"
              InputTitle="Preço de custo:"
              type="numeric"
            />
          </View>
          <View
            style={{
              width: '48.5%'
            }}
          >
            <CustomInput
              control={control}
              name="sellingPrice"
              placeholder="R$"
              InputTitle="Preço de venda:"
              type="numeric"
            />
          </View>
        </View>
        <CustomInput
          control={control}
          name="brand"
          placeholder="Insira a marca do produto"
          InputTitle="Marca:"
          type="default"
        />
        <CustomInput
          control={control}
          name="expiryDate"
          placeholder="dd/mm/aaaa"
          InputTitle="Validade:"
          type="default"
        />
        <CustomInput
          control={control}
          name="quantity"
          placeholder="Insira a quantidade"
          InputTitle="Quantidade:"
          type="numeric"
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

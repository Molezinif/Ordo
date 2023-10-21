import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  ButtonWrapper,
  Container,
  Form,
  Header,
  Input,
  Title,
  TitleText
} from './styles'
import { BasicButton } from '@/components/BasicButton'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'
import { CustomInput } from '@/components/shared/CustomFuckingInput'
import { useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function Register({ navigation }) {
  const { control, handleSubmit } = useForm()
  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data?.email, data?.password)
      navigation.navigate('Login')
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
        <Title>
          <TitleText>Bem vindo,</TitleText>
          <TitleText>Cadastre-se</TitleText>
        </Title>
      </Header>
      <Form>
        <CustomInput
          placeholder="Insira o email"
          InputTitle={'Email:'}
          control={control}
          name={'Email'}
          type="email-address"
        />
        <CustomInput
          placeholder="Insira o telefone"
          InputTitle={'Telefone'}
          control={control}
          name={'Phone'}
          type="phone-pad"
        />
        <CustomInput
          placeholder="Insira seu nome"
          control={control}
          type="username"
          InputTitle={'Usuário:'}
          name={'user'}
        />
        <CustomInput
          placeholder="Insira a senha"
          control={control}
          type="password"
          InputTitle={'Senha:'}
          name={'password'}
        />
        <CustomInput
          placeholder="Confirme sua senha"
          InputTitle={'Confirmar senha:'}
          name={'confirmPassword'}
          control={control}
          type="password"
        />
        <ButtonWrapper>
          <BasicButton
            onPress={handleSubmit(onSubmit)}
            text="Finalizar"
            width="50%"
            size="md"
          />
        </ButtonWrapper>
      </Form>
    </KeyboardAwareScrollView>
  )
}

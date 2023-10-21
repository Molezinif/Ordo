import React, { useState } from 'react'
import { Image } from 'react-native'
import { useAuth } from '@/context/auth'
import { BasicButton } from '@/components/BasicButton'
import { Link } from '@react-navigation/native'
import {
  ButtonWrapper,
  Container,
  Form,
  Header,
  Input,
  LinkContent,
  LinkText,
  LinkWrapper,
  Title,
  TitleText
} from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CustomInput } from '@/components/shared/CustomFuckingInput'
import { useForm } from 'react-hook-form'

export function Login() {
  const { control, handleSubmit } = useForm()

  const { signIn } = useAuth()

  const handleLogin = async (data) => {
    console.log(data)
    await signIn({ email: data?.email, password: data?.password })
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
      <Image
        source={require('@/assets/logo.png')}
        style={{
          width: 120,
          height: 120,
          alignSelf: 'center',
          marginTop: 100,
          marginBottom: 20
        }}
      />
      <Header>
        <Title>
          <TitleText>Login</TitleText>
        </Title>
      </Header>
      <Form>
        <CustomInput
          placeholder="Insira seu email"
          control={control}
          name={'email'}
          contentType="emailAddress"
          type={'default'}
        />
        <CustomInput
          placeholder="Insira sua senha"
          control={control}
          name={'password'}
          contentType="password"
          type={'default'}
        />
        <ButtonWrapper>
          <BasicButton
            onPress={handleSubmit(handleLogin)}
            text="Entrar"
            size="lg"
            width="100%"
          />
          <LinkWrapper>
            <LinkText>
              Ainda não tem uma conta?{' '}
              <Link to="/Register">
                <LinkContent>Cadastre-se</LinkContent>
              </Link>
            </LinkText>
          </LinkWrapper>
        </ButtonWrapper>
      </Form>
    </KeyboardAwareScrollView>
  )
}

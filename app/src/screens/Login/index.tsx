import React from 'react'
import { Image, View } from 'react-native'
import { useAuth } from '@/context/auth'
import { BasicButton } from '@/components/BasicButton'
import { Link } from '@react-navigation/native'
import {
  ButtonWrapper,
  Form,
  Header,
  LinkContent,
  LinkText,
  LinkWrapper,
  Title,
  TitleText
} from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CustomInput } from '@/components/shared/CustomFuckingInput'
import { Controller, useForm } from 'react-hook-form'

export function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { signIn } = useAuth()

  const handleLogin = async (data) => {
    await signIn({ email: data?.emailOrUser, password: data?.password })
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
        <View style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder="Insira seu email"
                type="default"
                error={errors.emailOrUser?.message}
              />
            )}
            name="emailOrUser"
            rules={{ required: 'Preencha seu email' }}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                placeholder="Insira sua senha"
                type="password"
                error={errors.password?.message}
              />
            )}
            name="password"
            rules={{ required: 'Preencha sua senha' }}
          />
        </View>

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

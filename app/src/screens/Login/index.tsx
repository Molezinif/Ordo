import React from 'react'
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
import { Image } from 'react-native'

export function Login({ navigation }) {
  const handleLogin = () => {
    // TODO: lógica para enviar dados do formulário para o servidor
    navigation.navigate('Dashboard')
  }

  return (
    <Container>
      <Image
        source={require('@/assets/logo.png')}
        style={{
          width: 120,
          height: 120,
          display: 'flex',
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
        <Input
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <Input
          placeholder="Senha"
          value={() => {}}
          secureTextEntry={true}
          textContentType="password"
        />
        <ButtonWrapper>
          <BasicButton
            onPress={handleLogin}
            text="Entrar"
            size="lg"
            width="100%"
          />
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

import React from 'react'
import {
  ButtonWrapper,
  Container,
  Form,
  Header,
  Input,
  SubmitButton,
  Title,
  TitleText
} from './styles'
import { BasicButton } from '../../components/BasicButton'
import { View, Image } from 'react-native'

export default function Login({ navigation }) {
  const handleLogin = () => {
    // lógica para enviar dados do formulário para o servidor
  }

  return (
    <Container>
      <Image
        source={require('../../assets/logo.png')}
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
          <SubmitButton title={'Login'} />
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

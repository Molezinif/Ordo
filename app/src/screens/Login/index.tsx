import React from 'react'
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

export function Login({ navigation }) {
  const { signIn } = useAuth()

  const handleLogin = () => {
    signIn()
  }

  return (
    <Container>
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
        <Input
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <Input
          placeholder="Senha"
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
    </Container>
  )
}

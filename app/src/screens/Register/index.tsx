import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
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

export default function Register({ navigation }) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = () => {
    // lógica para enviar dados do formulário para o servidor
  }

  return (
    <Container>
      <Header>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        ></TouchableOpacity>
        <Title>
          <TitleText>Bem vindo,</TitleText>
          <TitleText>Cadastre-se</TitleText>
        </Title>
      </Header>
      <Form>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <Input
          placeholder="Telefone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          keyboardType="phone-pad"
        />
        <Input
          placeholder="Usuário"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          textContentType="username"
        />
        <Input
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          textContentType="password"
        />
        <Input
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
          textContentType="password"
        />
        <ButtonWrapper>
          <BasicButton
            onPress={handleRegister}
            text={'Finalizar'}
            width="100px"
          />
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

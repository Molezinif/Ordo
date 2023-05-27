import {
  ButtonContainer,
  Container,
  LinkContent,
  LinkText,
  MainText,
  TextContainer
} from './styles'
import { BasicButton } from '../../components/BasicButton'
import { Link } from '@react-navigation/native'

export default function Home({ navigation }) {
  const handleButtonPress = () => {
    navigation.navigate('Register')
  }

  return (
    <Container>
      <TextContainer>
        <MainText>Comece Agora,</MainText>
        <MainText>Gerencie sua empresa </MainText>
        <MainText>conosco!</MainText>
      </TextContainer>
      <ButtonContainer>
        <BasicButton
          text={'Começar'}
          onPress={handleButtonPress}
          width="280px"
        />
        <LinkText>
          Já tem uma conta?{' '}
          <Link to="/Login">{<LinkContent>Login</LinkContent>}</Link>
        </LinkText>
      </ButtonContainer>
    </Container>
  )
}

import { ButtonContainer, Container, Text, TextContainer } from './styles'
import { BasicButton } from '../../components/BasicButton'

export default function Home({ navigation }) {
  const handleButtonPress = () => {
    navigation.navigate('Register')
  }

  return (
    <Container>
      <TextContainer>
        <Text>Comece Agora,</Text>
        <Text>Gerencie sua empresa </Text>
        <Text>conosco!</Text>
      </TextContainer>
      <ButtonContainer>
        <BasicButton
          text={'Começar'}
          onPress={handleButtonPress}
          width="280px"
        />
      </ButtonContainer>
    </Container>
  )
}

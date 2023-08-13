import { Text } from 'native-base'
import { Container, TopBarContainer } from './styles'
import { Button } from 'react-native'
import { useAuth } from '@/context/auth'

export function Settings() {
  const { user, signOut } = useAuth()
  const handleSignOut = () => {
    signOut()
  }
  return (
    <Container>
      <TopBarContainer>
        <Text fontSize={20} bold>
          Settings
        </Text>
        <Button title="Sign Out" onPress={handleSignOut} />
      </TopBarContainer>
    </Container>
  )
}

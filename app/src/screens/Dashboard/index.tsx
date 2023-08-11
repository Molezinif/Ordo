import { Text, Heading, Avatar } from 'native-base'
import {
  Container,
  MainContentContainer,
  ToggleContainer,
  TopBarContainer
} from './styles'
import { ToggleButton } from '@/components/ToggleButton'
import { mockAvatarImage } from '@/constants/dashboard'

export function Dashboard() {
  return (
    <Container>
      <TopBarContainer>
        <Text fontSize={20} bold>
          Dashboard
        </Text>
        <Avatar
          bg="green.500"
          source={{
            uri: mockAvatarImage
          }}
        >
          AJ
        </Avatar>
      </TopBarContainer>
      <Heading marginTop={30} fontSize={35}>
        {'Olá,\nUsuário!👋'}
      </Heading>
      <MainContentContainer>
        <ToggleContainer>
          <ToggleButton
            optionOneText="Produtividade"
            optionTwoText="Overview"
          />
        </ToggleContainer>
      </MainContentContainer>
    </Container>
  )
}

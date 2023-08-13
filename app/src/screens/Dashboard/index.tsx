import { Text, Heading, Avatar } from 'native-base'
import {
  Container,
  MainContentContainer,
  ToggleContainer,
  TopBarContainer
} from './styles'
import { ToggleButton } from '@/components/ToggleButton'
import { mockAvatarImage } from '@/constants/dashboard'
import { Productivity } from './Sections/Productivity'
import { useState } from 'react'
import { Overview } from './Sections/Overview'
import { TouchableOpacity } from 'react-native'

export function Dashboard({ navigation }) {
  const [isProductivityScreen, setIsProductivityScreen] = useState(true)
  const [isOverviewScreen, setIsOverviewScreen] = useState(false)

  const handleToggleScreen = () => {
    setIsProductivityScreen(!isProductivityScreen)
    setIsOverviewScreen(!isOverviewScreen)
  }

  const handleAvatarPress = () => {
    navigation.navigate('Settings')
  }

  return (
    <Container>
      <TopBarContainer>
        <Text fontSize={20} bold>
          Dashboard
        </Text>
        <TouchableOpacity onPress={handleAvatarPress} activeOpacity={1}>
          <Avatar
            bg="green.500"
            source={{
              uri: mockAvatarImage
            }}
          >
            AJ
          </Avatar>
        </TouchableOpacity>
      </TopBarContainer>
      <Heading marginTop={30} fontSize={35}>
        {'Olá,\nUsuário!👋'}
      </Heading>
      <MainContentContainer>
        <ToggleContainer>
          <ToggleButton
            optionOneOnPress={handleToggleScreen}
            optionTwoOnPress={handleToggleScreen}
            optionOneText="Produtividade"
            optionTwoText="Overview"
          />
        </ToggleContainer>
        {isProductivityScreen && <Productivity />}
        {isOverviewScreen && <Overview />}
      </MainContentContainer>
    </Container>
  )
}

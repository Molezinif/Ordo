/* eslint-disable @typescript-eslint/no-unused-vars */
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
import React, { useEffect, useState } from 'react'
import { Overview } from './Sections/Overview'
import { TouchableOpacity } from 'react-native'
import { HistoryCard } from '@/components/HistoryCard'
import { SalesRepository } from '@/services/repositories'
import { useItens } from '@/context/itensContext'

export function Dashboard({ navigation }: any) {
  const [isProductivityScreen, setIsProductivityScreen] = useState(true)
  const [isOverviewScreen, setIsOverviewScreen] = useState(false)

  const { salesHistory, handleGetSalesHistory } = useItens()

  const handleToggleScreen = () => {
    setIsProductivityScreen(!isProductivityScreen)
    setIsOverviewScreen(!isOverviewScreen)
  }

  const handleAvatarPress = () => {
    navigation.navigate('Settings')
  }

  useEffect(() => {
    handleGetSalesHistory()
  }, [handleGetSalesHistory])

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
        <HistoryCard historyItens={salesHistory} />
      </MainContentContainer>
    </Container>
  )
}

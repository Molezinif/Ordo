/* eslint-disable @typescript-eslint/no-unused-vars */
import { Heading, Avatar } from 'native-base'
import {
  Container,
  DashboardHeaderLabel,
  MainContentContainer,
  TopBarContainer
} from './styles'
import { mockAvatarImage } from '@/constants/dashboard'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { HistoryCard } from '@/components/HistoryCard'
import { useItens } from '@/context/itensContext'

export function Dashboard({ navigation }: any) {
  const { salesHistory, handleGetSalesHistory } = useItens()

  const handleAvatarPress = () => {
    navigation.navigate('Settings')
  }

  useEffect(() => {
    handleGetSalesHistory()
  }, [handleGetSalesHistory])

  return (
    <Container>
      <TopBarContainer>
        <DashboardHeaderLabel>Dashboard</DashboardHeaderLabel>
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
      <Heading marginTop={22} fontSize={30}>
        {'Olá,\nUsuário!👋'}
      </Heading>
      <MainContentContainer>
        <HistoryCard historyItens={salesHistory} />
      </MainContentContainer>
    </Container>
  )
}

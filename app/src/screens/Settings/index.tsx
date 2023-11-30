import { Text } from 'native-base'
import { Container, TopBarContainer } from './styles'
import { Button } from 'react-native'
import { useAuth } from '@/context/auth'
import React from 'react'

export function Settings() {
  const { signOut } = useAuth()
  const handleSignOut = () => {
    signOut()
  }
  return (
    <Container>
      <TopBarContainer>
        <Text fontSize={20} bold>
          Configurações
        </Text>
        <Button title="Sair" onPress={handleSignOut} />
      </TopBarContainer>
    </Container>
  )
}

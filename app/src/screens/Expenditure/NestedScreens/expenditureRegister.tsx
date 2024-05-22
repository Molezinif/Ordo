/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from 'native-base'
import {
  Container,
  ExpenditureHeaderLabel,
  MainContentContainer,
  InputTitle
} from './styles'
import React from 'react'
import { View } from 'react-native'

export function ExpenditureRegister({ navigation }: any) {
  return (
    <Container>
      <MainContentContainer>
        <ExpenditureHeaderLabel>Cadastrar Despesa</ExpenditureHeaderLabel>
        <View style={{ display: 'flex', gap: 20, width: '100%' }}>
          <View style={{ display: 'flex', gap: 10, width: '100%' }}>
            <InputTitle>Nome</InputTitle>
            <Input
              keyboardType={'numeric'}
              borderRadius={'8'}
              size={'lg'}
              width={'100%'}
              placeholder={'Insira o nome'}
              bgColor={'white'}
              value={''}
              onChangeText={(e) => {
                //
              }}
              autoCapitalize="none"
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View style={{ display: 'flex', gap: 10, width: '48%' }}>
              <InputTitle>Valor</InputTitle>
              <Input
                keyboardType={'numeric'}
                borderRadius={'8'}
                size={'lg'}
                placeholder={'Insira o valor'}
                bgColor={'white'}
                value={''}
                onChangeText={(e) => {
                  //
                }}
                autoCapitalize="none"
              />
            </View>
            <View style={{ display: 'flex', gap: 10, width: '48%' }}>
              <InputTitle>Planejamento</InputTitle>
              <Input
                keyboardType={'numeric'}
                borderRadius={'8'}
                size={'lg'}
                placeholder={'dd/mm/yyyy'}
                bgColor={'white'}
                value={''}
                onChangeText={(e) => {
                  //
                }}
                autoCapitalize="none"
              />
            </View>
          </View>
        </View>
      </MainContentContainer>
    </Container>
  )
}

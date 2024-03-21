import { useItens } from '@/context/itensContext'
import {
  Container,
  ContentContainer,
  HeaderContainer,
  NotFoundContainer,
  NotFoundText,
  StockContentContainer,
  StockHeaderLabel
} from './styles'
import { StockCard } from '@/components/StockCard'
import React, { useEffect, useState } from 'react'
import { BasicButton } from '@/components'
import { Icon } from 'native-base'
import { CustomInput } from '@/components/shared/CustomFuckingInput'
import { MaterialIcons } from '@expo/vector-icons'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { useForm } from 'react-hook-form'
import { AnimaterFlyPaperLoading } from '@/components/AnimatedView'
import { NoResultsFoundComponent } from '@/components/NoResultsFound'

export function Stock({ navigation }: any) {
  const { handleGetStock, stockItems, handleSearchStock, notFoundProducts } =
    useItens()
  const [searchInputValue, setSearchInputValue] = useState<string>('')

  useEffect(() => {
    const data = async () => {
      await handleGetStock()
    }
    void data()
  }, [handleGetStock])

  const { register } = useForm()

  return (
    <Container>
      <ContentContainer>
        <HeaderContainer>
          <StockHeaderLabel>Estoque</StockHeaderLabel>
          <BasicButton
            text="+ Cadastrar"
            size="sm"
            fontSize={14}
            onPress={() => navigation.navigate('ItensRegister')}
          />
        </HeaderContainer>

        <CustomInput
          {...register('stockSearchInput')}
          value={searchInputValue ?? ''}
          onChange={(e) => {
            setSearchInputValue(e)
            handleSearchStock(e)
          }}
          borderRadius={'16'}
          icon={
            <Icon
              as={<MaterialIcons name="search" />}
              size={'md'}
              ml={'3'}
              bg={'white'}
            />
          }
          placeholder="Pesquisar"
          error={''}
          name="stockSearch"
          type="default"
        />
        {notFoundProducts && <NoResultsFoundComponent />}
        {stockItems?.length && !notFoundProducts ? (
          <MaskedView
            style={{ flex: 1 }}
            maskElement={
              <LinearGradient
                style={{ flex: 1 }}
                colors={[
                  'white',
                  'white',
                  'white',
                  'white',
                  'white',
                  'white',
                  'white',
                  'transparent'
                ]}
              />
            }
          >
            <StockContentContainer>
              <StockCard
                itens={stockItems}
                navigateCallBack={() => {
                  console.log('oi')
                }}
              />
            </StockContentContainer>
          </MaskedView>
        ) : (
          !stockItems?.length &&
          !notFoundProducts && <AnimaterFlyPaperLoading />
        )}
      </ContentContainer>
    </Container>
  )
}

import { useItens } from '@/context/itensContext'
import {
  Container,
  ContentContainer,
  HeaderContainer,
  SearchInputContainer,
  StockContentContainer,
  StockHeaderLabel
} from './styles'
import { StockCards } from '@/components/StockCard'
import React, { useEffect, useState } from 'react'
import { BasicButton } from '@/components'
import { Icon } from 'native-base'
import { CustomInput } from '@/components/shared/CustomFuckingInput'
import { MaterialIcons } from '@expo/vector-icons'
import { useForm } from 'react-hook-form'
import { AnimaterFlyPaperLoading } from '@/components/AnimatedView'
import { NoResultsFoundComponent } from '@/components/NoResultsFound'

export function Stock({ navigation }: any) {
  const { handleGetStock, stockItems, handleSearchStock, notFoundProducts } =
    useItens()
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const data = async () => {
      await handleGetStock()
    }
    setIsLoading(true)
    void data()
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [handleGetStock])

  const { register, setValue } = useForm()

  return (
    <Container>
      <ContentContainer>
        <HeaderContainer>
          <StockHeaderLabel>Estoque</StockHeaderLabel>
          <BasicButton
            text="+ Cadastrar"
            size="sm"
            fontSize={14}
            onPress={() => {
              setSearchInputValue('')
              navigation.navigate('ItensRegister')
            }}
          />
        </HeaderContainer>
        <SearchInputContainer>
          <CustomInput
            {...register('stockSearchInput')}
            value={searchInputValue ?? ''}
            onChange={(e) => {
              setSearchInputValue(e)
              handleSearchStock(e)
            }}
            borderRadius={'8'}
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
            type="default"
          />
        </SearchInputContainer>

        {notFoundProducts && !isLoading && <NoResultsFoundComponent />}
        {stockItems?.length && !notFoundProducts && !isLoading ? (
          <StockContentContainer>
            <StockCards
              itens={stockItems}
              onPressItemCallback={(item) => {
                navigation.navigate('ItensRegister', {
                  itemToEdit: item
                })
              }}
            />
          </StockContentContainer>
        ) : (
          isLoading && <AnimaterFlyPaperLoading />
        )}
      </ContentContainer>
    </Container>
  )
}

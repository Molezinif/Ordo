/* eslint-disable @typescript-eslint/no-unused-vars */
import { Heading, Avatar } from 'native-base'
import {
  Container,
  DashboardHeaderLabel,
  MainContentContainer,
  TopBarContainer
} from './styles'
import { mockAvatarImage } from '@/constants/dashboard'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { HistoryCard } from '@/components/HistoryCard'
import { useItens } from '@/context/itensContext'
import { useAuth } from '@/context/auth'
import { ExpenditureSectionItem } from '../Expenditure/Components/ExpenditureSectionItem'
import { getAverageMonthlyExpenditures } from '@/services/repositories/expenditure'
import { getAllTransactions } from '@/services/repositories/transactions'

export function Dashboard({ navigation }: any) {
  const { handleGetSalesHistory, triggerTransaction, setTriggerTransaction } =
    useItens()
  const [showExitIcon, setShowExitIcon] = useState(false)
  const [averageMonthlyExpenditures, setAverageMonthlyExpenditures] =
    React.useState({
      averageInventoryCost: 0,
      averageVariableCost: 0,
      averageOtherCost: 0,
      averageTotalCost: 0
    })
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    handleGetSalesHistory()
  }, [handleGetSalesHistory])

  const { signOut } = useAuth()
  const handleSignOut = () => {
    signOut()
  }
  console.log(triggerTransaction)
  useEffect(() => {
    if (triggerTransaction) {
      getAverageMonthlyExpenditures()
        .then((data) => {
          setAverageMonthlyExpenditures(data)
        })
        .catch((err) => {
          console.error('Error fetching data:', err)
        })

      getAllTransactions()
        .then((data: any) => {
          setTransactions(data)
        })
        .catch((err) => {
          console.error('Error fetching data:', err)
        })
      setTriggerTransaction(false)
    }
  }, [triggerTransaction])

  useEffect(() => {
    getAverageMonthlyExpenditures()
      .then((data) => {
        setAverageMonthlyExpenditures(data)
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
      })

    getAllTransactions()
      .then((data: any) => {
        setTransactions(data)
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
      })
    setTriggerTransaction(false)
  }, [])

  return (
    <Container
      onStartShouldSetResponder={(e) => {
        setShowExitIcon(false)
        return false
      }}
    >
      <TopBarContainer>
        <DashboardHeaderLabel>Dashboard</DashboardHeaderLabel>
        {showExitIcon ? (
          <TouchableOpacity onPress={() => handleSignOut()} activeOpacity={1}>
            <Avatar bg="#ff4955">
              <FontAwesome6
                name="arrow-right-from-bracket"
                size={22}
                color={'white'}
              />
            </Avatar>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setShowExitIcon(true)}
            activeOpacity={1}
          >
            <Avatar
              bg="green.500"
              source={{
                uri: mockAvatarImage
              }}
            />
          </TouchableOpacity>
        )}
      </TopBarContainer>
      <Heading marginTop={22} fontSize={30}>
        {'Olá,\nUsuário!👋'}
      </Heading>
      <MainContentContainer>
        <ExpenditureSectionItem
          title={'Entrada de estoque'}
          onClickAction={() => navigation.navigate('InventoryCostExpenditure')}
          subtitle={'Produtos >'}
          value={Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(averageMonthlyExpenditures.averageInventoryCost)}
        />
        <HistoryCard historyItens={transactions} />
      </MainContentContainer>
    </Container>
  )
}

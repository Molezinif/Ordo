import { View, Text, Dimensions, ScrollView, LogBox } from 'react-native'
import {
  Container,
  ContentContainer,
  HeaderContainer,
  ChartHeaderLabel,
  ScrollContentView,
  ChartContentView,
  ChartTitle,
  FinanceLabel
} from './styles'
import React, { useEffect, useMemo, useState } from 'react'
import { PieChart } from 'react-native-chart-kit'
import { getTransactionAnalytics } from '@/services/repositories/transactions'
import { Badge, Select } from 'native-base'
import { getProductsAnalytic } from '@/services/repositories/itens/productAnalycts'
import { FinancesChartSkeleton } from './skeleton'

enum EFinancesChartOptions {
  inventoryReceipt = 'entry',
  InventoryProfit = 'profit'
}

enum EPieChartOptions {
  quantity = 'topFiveProductsSoldQuantity',
  bill = 'topFiveBilledProducts'
}

export function Chart() {
  const [financesData, setFinancesData] = useState<any>({
    dataset: [],
    labels: []
  })

  const [pieChartData, setPieChartData] = useState({
    topFiveBilledProducts: [
      {
        name: 'Default',
        population: 180,
        color: '#395E66'
      }
    ],
    topFiveProductsSoldQuantity: [
      {
        name: 'Default',
        population: 150,
        color: '#395E66'
      }
    ]
  })

  const [pieChartOption, setPieChartOption] = useState(EPieChartOptions.bill)

  const [financeChartOption, setFinanceChartOption] = useState(
    EFinancesChartOptions.InventoryProfit
  )

  const [selectMonth, setSelectMonth] = useState(0)

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
  }, [])

  useEffect(() => {
    getTransactionAnalytics()
      .then((data: any) => {
        setFinancesData(data.chartData)
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
      })
  }, [])

  useEffect(() => {
    getProductsAnalytic()
      .then((data: any) => {
        setPieChartData(data)
      })
      .catch((err) => {
        console.error('Error fetching data:', err)
      })
  }, [])

  const getBarColor = useMemo(
    () =>
      ({ selectedIndex, currentIndex, isNegativePercentage }) => {
        if (isNegativePercentage) {
          return selectedIndex === currentIndex ? '#ff4955' : '#ff9299'
        }
        return selectedIndex === currentIndex ? '#3789db' : '#a2c8ee'
      },
    []
  )

  const getBarLabelColor = useMemo(
    () =>
      ({ selectedIndex, currentIndex }) => {
        if (selectedIndex === currentIndex) {
          return '#333333'
        }
        return '#6D6D6D'
      },
    []
  )

  const getBadgeColor = useMemo(
    () =>
      ({ financeChartOptionSelected, isNegativePercentage }) => {
        if (isNegativePercentage) {
          return '#ff4955'
        }

        return financeChartOptionSelected ===
          EFinancesChartOptions.InventoryProfit
          ? 'green.400'
          : 'yellow.300'
      },
    []
  )

  const getBarPercentage = useMemo(
    () =>
      ({ financeChartOptionSelected, entryPercentage, profitPercentage }) => {
        if (
          financeChartOptionSelected === EFinancesChartOptions.inventoryReceipt
        ) {
          const percentageWithoutSign = Math.abs(entryPercentage)
          return percentageWithoutSign > 100 ? 100 : percentageWithoutSign
        }

        const percentageWithoutSign = Math.abs(profitPercentage)
        return percentageWithoutSign > 100 ? 100 : percentageWithoutSign
      },
    []
  )

  return (
    <Container>
      <ContentContainer>
        <ScrollContentView >
          <HeaderContainer>
            <ChartHeaderLabel>Métricas</ChartHeaderLabel>
          </HeaderContainer>
          <ChartContentView>
            <View style={{ display: 'flex' }}>
              {/* VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead */}
              <Select
                placeholder="Selecione"
                selectedValue={financeChartOption}
                width={'32'}
                height={'10'}
                borderRadius={'lg'}
                onValueChange={(itemValue: string) =>
                  setFinanceChartOption(itemValue as EFinancesChartOptions)
                }
              >
                <Select.Item
                  label="Lucro"
                  value={EFinancesChartOptions.InventoryProfit}
                />
                <Select.Item
                  label="Receita"
                  value={EFinancesChartOptions.inventoryReceipt}
                />
              </Select>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 10
                }}
              >
                <Badge
                  width={'0'}
                  height={'1/2'}
                  backgroundColor={getBadgeColor({
                    financeChartOptionSelected: financeChartOption,
                    isNegativePercentage:
                      financeChartOption ===
                      EFinancesChartOptions.inventoryReceipt
                        ? financesData?.datasets?.[selectMonth].data
                            .entryPercentage < 0
                        : financesData?.datasets?.[selectMonth].data
                            .profitPercentage < 0
                  })}
                  borderRadius={'full'}
                />
                <FinanceLabel>{`${financesData?.datasets?.[selectMonth].data?.[financeChartOption] ?? 'R$ 00,0'}`}</FinanceLabel>
              </View>
              {financesData?.datasets?.length ? (
                <ScrollView
                  horizontal={true}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    style={{
                      display: 'flex',
                      flex: 1,
                      height: 200,
                      width: '100%',
                      flexDirection: 'row',
                      marginTop: 15,
                      gap: 2
                    }}
                  >
                    {financesData.datasets.map((item: any, index: number) => (
                      <View
                        onStartShouldSetResponder={(e) => {
                          setSelectMonth(index)
                          return true
                        }}
                        key={index}
                        style={{
                          display: 'flex',
                          height: `100%`,
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 2
                        }}
                      >
                        <View
                          style={{
                            display: 'flex',
                            height: '92%',
                            width: '100%',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                          }}
                        >
                          <View
                            style={{
                              backgroundColor: '#F3F9FF',
                              width: 50,
                              borderRadius: 6,
                              position: 'absolute',
                              height: '100%'
                            }}
                          />
                          <View
                            style={{
                              backgroundColor: `${getBarColor({ selectedIndex: selectMonth, currentIndex: index, isNegativePercentage: financeChartOption === EFinancesChartOptions.inventoryReceipt ? item?.data?.entryPercentage < 0 : item?.data?.profitPercentage < 0 })}`,
                              height: `${getBarPercentage({ financeChartOptionSelected: financeChartOption, entryPercentage: item?.data?.entryPercentage, profitPercentage: item?.data?.profitPercentage })}%`,
                              width: 50,
                              borderRadius: 6
                            }}
                          />
                        </View>

                        <Text
                          style={{
                            fontSize: 12,
                            color: getBarLabelColor({
                              currentIndex: index,
                              selectedIndex: selectMonth
                            })
                          }}
                        >
                          {item.label}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              ) : (
                <FinancesChartSkeleton />
              )}
            </View>
            <View style={{ display: 'flex', gap: 10 }}>
              <ChartTitle>Tendencias</ChartTitle>
              <Select
                placeholder="Selecione"
                selectedValue={pieChartOption}
                width={'40'}
                height={'10'}
                borderRadius={'lg'}
                onValueChange={(itemValue: string) =>
                  setPieChartOption(itemValue as EPieChartOptions)
                }
              >
                <Select.Item
                  label="Faturamento"
                  value={EPieChartOptions.bill}
                />
                <Select.Item
                  label="Quantidade"
                  value={EPieChartOptions.quantity}
                />
              </Select>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around'
                }}
              >
                <View
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 0.1,
                    borderColor: '#D3D3D3',
                    borderRadius: 10
                  }}
                >
                  <PieChart
                    data={pieChartData[pieChartOption]}
                    width={Dimensions.get('window').width - 25}
                    height={220}
                    hasLegend={false}
                    chartConfig={{
                      decimalPlaces: 1,
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: () => `#333333`,
                      style: {
                        borderRadius: 16
                      },
                      propsForDots: {
                        r: '4'
                      }
                    }}
                    accessor={'population'}
                    backgroundColor={'transparent'}
                    paddingLeft="0"
                    center={[90, 1]}
                  />
                </View>
              </View>
              <View style={{ display: 'flex', gap: 10 }}>
                {pieChartData[pieChartOption].map((item, index) => {
                  return (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'center',
                        gap: 5,
                        backgroundColor: '#F3F9FF',
                        borderRadius: 14,
                        padding: 10
                      }}
                      key={index}
                    >
                      <Text
                        style={{
                          fontWeight: 400,
                          fontSize: 16,
                          color: '#333333'
                        }}
                      >
                        {`${index + 1}º`}
                      </Text>
                      <View
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: `${item.color}`,
                          borderRadius: 14
                        }}
                      />
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                          width: '80%'
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 16,
                            color: '#5F5F5F'
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            fontWeight: 400,
                            fontSize: 16,
                            color: '#2BC016'
                          }}
                        >
                          {pieChartOption === EPieChartOptions.bill
                            ? Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(item.population)
                            : item.population + ' un.'}
                        </Text>
                      </View>
                    </View>
                  )
                })}
              </View>
            </View>
          </ChartContentView>
        </ScrollContentView>
      </ContentContainer>
    </Container>
  )
}

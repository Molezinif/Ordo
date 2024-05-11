import { View, Text, Dimensions } from 'react-native'
import {
  Container,
  ContentContainer,
  HeaderContainer,
  ChartHeaderLabel,
  ScrollContentView,
  ChartContentView,
  ChartTitle
} from './styles'
import React from 'react'
import { LineChart, PieChart } from 'react-native-chart-kit'

export function Chart({ navigation }: any) {
  const data = [
    {
      name: 'Banana',
      population: 110,
      color: '#395E66',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Laranja',
      population: 130,
      color: '#387D7A',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Batata',
      population: 150,
      color: '#32936F',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Fanta Uva',
      population: 180,
      color: '#26A96C',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    },
    {
      name: 'Coca-cola',
      population: 80,

      color: '#2BC016',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15
    }
  ]

  console.log(Dimensions.get('window').width - 50)
  return (
    <Container>
      <ContentContainer>
        <HeaderContainer>
          <ChartHeaderLabel>Métricas</ChartHeaderLabel>
        </HeaderContainer>

        <ScrollContentView>
          <ChartContentView>
            <View style={{ display: 'flex', gap: 20 }}>
              <LineChart
                data={{
                  labels: ['Jan', 'Fev', 'Marc', 'Abr', 'Maio', 'Jun'],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ],
                      color: () => `#FFE74C`
                    },
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ],
                      color: () => `#2BC016`
                    },
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                      ],
                      color: () => `#FF5964`
                    }
                  ],
                  legend: ['Custo', 'Lucro', 'Perda']
                }}
                width={Dimensions.get('window').width - 25}
                transparent
                onDataPointClick={(e) => {
                  console.log('onDataPointClick', e)
                }}
                height={220}
                yAxisLabel="R$"
                yAxisSuffix="K"
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
                style={{
                  borderRadius: 16
                }}
              />
            </View>
            <View style={{ display: 'flex', gap: 5, marginTop: 20 }}>
              <ChartTitle>Tendencias</ChartTitle>
              <PieChart
                data={data}
                width={Dimensions.get('window').width - 25}
                height={220}
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
                absolute
              />
            </View>
          </ChartContentView>
        </ScrollContentView>
      </ContentContainer>
    </Container>
  )
}

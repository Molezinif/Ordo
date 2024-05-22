import { monthNames } from '@/services/repositories/transactions'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

const mockSkeleton = {
  datasets: [
    {
      label: monthNames[0],
      data: {
        entry: 'R$ 00,0',
        profit: 'R$ 00,0',
        entryPercentage: 0,
        profitPercentage: 0
      }
    },
    {
      label: monthNames[1],
      data: {
        entry: 'R$ 00,0',
        profit: 'R$ 00,0',
        entryPercentage: 0,
        profitPercentage: 0
      }
    },
    {
      label: monthNames[2],
      data: {
        entry: 'R$ 00,0',
        profit: 'R$ 00,0',
        entryPercentage: 0,
        profitPercentage: 0
      }
    },
    {
      label: monthNames[3],
      data: {
        entry: 'R$ 00,0',
        profit: 'R$ 00,0',
        entryPercentage: 0,
        profitPercentage: 0
      }
    },
    {
      label: monthNames[4],
      data: {
        entry: 'R$ 00,0',
        profit: 'R$ 00,0',
        entryPercentage: 0,
        profitPercentage: 0
      }
    },
    {
      label: monthNames[5],
      data: {
        entry: 'R$ 00,0',
        profit: 'R$ 00,0',
        entryPercentage: 0,
        profitPercentage: 0
      }
    },
    {
      label: monthNames[6],
      data: {
        entry: 'R$ 00,0',
        profit: 'R$ 00,0',
        entryPercentage: 0,
        profitPercentage: 0
      }
    },
    {
      label: monthNames[7],
      data: {
        entry: 'R$ 00,0',
        profit: 'R$ 00,0',
        entryPercentage: 0,
        profitPercentage: 0
      }
    }
  ],
  largestEntryTransaction: 6000,
  largestWriteOffTransaction: 5600.9
}

const BarSkeleton = styled.View`
  width: 50px;
  border-radius: 6px;
  position: absolute;
  height: 100%;
  background-color: #F3F9FF;
`

export const FinancesChartSkeleton = () => {
  return (
    <View
      style={{
        display: 'flex',
        height: 200,
        width: '100%',
        flexDirection: 'row',
        marginTop: 15,
        gap: 2
      }}
    >
      {mockSkeleton?.datasets?.map((item: any, index: number) => (
        <View
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
            <BarSkeleton />
            <View
              style={{
                height: `0%`,
                width: 50,
                borderRadius: 6
              }}
            />
          </View>

          <Text
            style={{
              fontSize: 12,
              color: '#6D6D6D'
            }}
          >
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  )
}

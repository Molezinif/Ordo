import { ClientCard } from '@/components/ClientCard'
import { Container, ContentContainer } from './styles'
import { Card } from '@/components/SaleCard'
import { View, Text } from 'native-base'
import { CardTitle } from '@/components/ClientCard/styles'
import { ToggleContainer } from '../Dashboard/styles'
import { ToggleButton } from '@/components'

export const mockItensToSale = [
  {
    id: 1,
    name: 'Coca-Cola 600ml',
    value: '7.50',
    amount: 3
  },
  {
    id: 2,
    name: 'Doritos',
    value: '1',
    amount: 3
  },
  {
    id: 3,
    name: 'Cookie Balduco',
    value: '100',
    amount: 3
  }
]

const mockClients = [
  {
    id: 1,
    name: 'Gabriel Molezini',
    personalDocument: '999.999.999-99'
  }
]

export function Sales({ navigation }) {
  return (
    <Container>
      <ContentContainer>
        <Card title={'Itens'} itens={mockItensToSale} />
        <ClientCard title={'Cliente'} itens={mockClients} />
        <View
          style={{
            display: 'flex',
            gap: 20
          }}
        >
          <CardTitle>Pagamento Parcelado?</CardTitle>
          <ToggleContainer>
            <ToggleButton
              optionOneOnPress={() => {}}
              optionTwoOnPress={() => {}}
              optionOneText="Sim"
              optionTwoText="Não"
            />
          </ToggleContainer>
        </View>
      </ContentContainer>
    </Container>
  )
}

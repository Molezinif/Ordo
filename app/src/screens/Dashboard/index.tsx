import { Text, Heading } from 'native-base'
import { Container } from './styles'

export function Dashboard() {
  return (
    <Container>
      <Heading>
        A component library for the{' '}
        <Heading color="emerald.400">React Ecosystem</Heading>
      </Heading>
      <Text pt="3">
        NativeBase is a simple, modular and accessible component library that
        gives you building blocks to build you React applications.
      </Text>
    </Container>
  )
}

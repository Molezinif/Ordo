import { NotFoundContainer, NotFoundText } from './styles'
import { Image } from 'react-native'

export const NoResultsFoundComponent = ({ size }: { size?: string }) => {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return {
          width: 80,
          height: 80
        }
      case 'md':
        return {
          width: 100,
          height: 100
        }
      case 'lg':
        return {
          width: 120,
          height: 120
        }
      default:
        return {
          width: 120,
          height: 120
        }
    }
  }
  return (
    <NotFoundContainer>
      <Image source={require('@/assets/noResults.png')} style={getSize()} />
      <NotFoundText>Nenhum resultado encontrado</NotFoundText>
    </NotFoundContainer>
  )
}

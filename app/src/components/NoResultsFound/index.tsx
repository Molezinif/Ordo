import { NotFoundContainer, NotFoundText } from './styles'
import { Image } from 'react-native'

export const NoResultsFoundComponent = () => {
  return (
    <NotFoundContainer>
      <Image
        source={require('@/assets/noResults.png')}
        style={{
          width: 120,
          height: 120
        }}
      />
      <NotFoundText>Nenhum resultado encontrado</NotFoundText>
    </NotFoundContainer>
  )
}

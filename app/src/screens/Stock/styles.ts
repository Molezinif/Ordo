import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  padding-top: ${Platform.OS === 'android' ? 10 : 0}px;
`

export const StockContentContainer = styled.ScrollView`
  flex: 1;
  padding: 0px 25px;
`

export const ContentContainer = styled.View`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? 40 : 20}px;
  gap: 30px;
`

export const StockHeaderLabel = styled.Text`
  font-size: 24px;
  font-weight: 400;
`

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
`

export const SearchInputContainer = styled.View`
  display: flex;
  padding: 0px 25px;
`

export const NotFoundContainer = styled.View`
  flex: 0.8;
  align-items: center;
  justify-content: center;
`

export const NotFoundText = styled.Text`
  font-size: 18px;
  font-weight: 400;
  margin-top: 10px;
  color: #333333;
`

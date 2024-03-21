import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`

export const StockContentContainer = styled.ScrollView`
  flex: 1;
`

export const ContentContainer = styled.View`
  flex: 1;
  margin-top: 20px;
  padding: 0px 25px;
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
`

export const FloatButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
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

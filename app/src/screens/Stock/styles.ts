import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: white;
`

export const StockContentContainer = styled.ScrollView`
  flex: 1;
`

export const ContentContainer = styled.View`
  flex: 1;
  margin-top: 80px;
  margin-bottom: 100px;
  padding: 0px 25px;
  gap: 30px;
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

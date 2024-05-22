import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: white;

  padding: 65px 22px 0 22px;
`

export const TopBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MainContentContainer = styled.ScrollView`
  width: 100%;
  margin-top: 24px;
`

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 400;
`

export const InputTitle = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: #333333;
`

export const ExpenditureHeaderLabel = styled.Text`
  font-size: 24px;
  font-weight: 400;
`

export const ToggleContainer = styled.View`
  width: 50%;
  align-self: flex-start;
  margin-bottom: 20px;
`

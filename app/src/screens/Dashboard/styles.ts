import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #ffff;

  padding: 65px 22px 0px 22px;
`

export const TopBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const MainContentContainer = styled.View`
  width: 100%;
  margin-top: 40px;
`

export const DashboardHeaderLabel = styled.Text`
  font-size: 24px;
  font-weight: 400;
`

export const ToggleContainer = styled.View`
  width: 50%;
  align-self: flex-start;
  margin-bottom: 20px;
`

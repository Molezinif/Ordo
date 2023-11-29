import styled from 'styled-components/native'

export const CardContainer = styled.View`
  display: flex;
  width: 100%;
`

export const ItemContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const CardTextInfo = styled.Text<{ color?: string; textSize?: string }>`
  font-size: ${(props) => (props.textSize ? props.textSize : '14px')};
  font-weight: 300;
  color: ${(props) => (props.color ? props.color : '#333333')};
`

export const CardView = styled.View`
  display: flex;
  width: 100%;
  padding: 4px;
  gap: 4px;
  background-color: #fff;
`

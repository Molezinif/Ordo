import styled from 'styled-components/native'

export const CardContainer = styled.View`
  flex: 1;
  background-color: white;
  gap: 8px;
`

export const ItemContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  margin: 10px 0px;
`

export const SearchInputContainer = styled.View`
  display: flex;
  width: 100%;
`

export const ButtonContainer = styled.View`
  position: absolute;
  bottom: 100px;
  margin-top: 200px;
  align-items: center;
  gap: 5px;
`

export const CardTextInfo = styled.Text<{ color?: string; textSize?: string }>`
  font-size: ${(props) => (props.textSize ? props.textSize : '16px')};
  color: ${(props) => (props.color ? props.color : '#333333')};
`

export const CardView = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
`

export const ItemImage = styled.View<{ isItensSelectable?: boolean }>`
  background-color: #d9d9d9;
  min-width: 40px;
  min-height: 40px;
  border-radius: 8px;
`

export const CardTitle = styled.Text`
  font-size: 16px;
  color: #333333;
`

export const CardFooter = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  color: #7c7c8a;
  justify-content: space-between;
  align-items: center;
`

export const SubtotalText = styled.Text`
  font-size: 17px;
  color: #7c7c8a;
`

export const ItemInfos = styled.View`
  display: flex;
  gap: 5px;
  flex-direction: column;
`

export const LeftItemInfos = styled.View`
  display: flex;
  flex-direction: column;
`

export const RightItemInfos = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`

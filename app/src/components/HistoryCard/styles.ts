import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const CardContainer = styled.View`
  display: flex;
  width: 100%;
  background-color: white;
  gap: 14px;
`

export const ItemContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`

export const ItemImage = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  min-width: 45px;
  min-height: 45px;
  border-radius: 8px;
`

export const CardFooter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const FooterText = styled.Text<{ isEmpty?: boolean }>`
  font-size: ${({ isEmpty }) => (isEmpty ? '14px' : '16px')};
  color: ${({ isEmpty }) => (isEmpty ? '#8D8D99' : '#7c7c8a')};
`

export const ItemInfos = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const CardTextInfo = styled.Text<{ color?: string; textSize?: string }>`
  font-size: ${(props) => (props.textSize ? props.textSize : '14px')};
  color: ${(props) => (props.color ? props.color : '#333333')};
`

export const CardTitle = styled.Text`
  font-size: 16px;
  color: #333333;
`

export const SubtotalText = styled.Text`
  font-size: 17px;
  color: #7c7c8a;
`

export const LeftItemInfos = styled.View`
  display: flex;
  flex-direction: column;
`

export const RightItemInfos = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0px 10px;
  justify-content: flex-end;
`

export const ScrollContentContainer = styled.ScrollView`
  background-color: white;
  height: 100%;
  max-height: 360px;
`

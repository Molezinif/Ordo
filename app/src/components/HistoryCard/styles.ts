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
  gap: 5px;
  background-color: white;
  border-radius: 8px;

  ${() => {
    if (Platform.OS === 'android') {
      return ``
    } else if (Platform.OS === 'ios') {
      return `
        shadow-color: rgba(0, 0, 0, 0.06);
        shadow-offset: 0px 2px;
        shadow-opacity: 0.5;
        shadow-radius: 4px;
      `
    } else {
      return ''
    }
  }}
`

export const CardView = styled.View<{ hasContent: boolean }>`
  display: flex;
  width: 100%;
  padding: 15px;
  gap: ${({ hasContent }) => (hasContent ? '10px' : '0px')};
  background-color: #fff;
  border-radius: 8px;

  ${() => {
    if (Platform.OS === 'android') {
      return `
        elevation: 0.8;
        shadowColor: '#52006A';
      `
    } else if (Platform.OS === 'ios') {
      return `
        shadow-color: rgba(0, 0, 0, 0.1);
        shadow-offset: 0px 4px;
        shadow-opacity: 1;
        shadow-radius: 6px;
        shadow-color: rgba(0, 0, 0, 0.06);
        shadow-offset: 0px 2px;
        shadow-opacity: 1;
        shadow-radius: 4px;
      `
    } else {
      return ''
    }
  }}
`

export const ItemImage = styled.View`
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
  flex-direction: column;
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
  max-height: 225px;
`

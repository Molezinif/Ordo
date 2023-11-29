import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const CardContainer = styled.View`
  display: flex;
  width: 100%;
  background-color: white;
  gap: 4px;
`

export const ItemContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: white;
  border-radius: 8px;

  ${() => {
    if (Platform.OS === 'android') {
      return `
        elevation: 5;
      `
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
        elevation: 5;
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

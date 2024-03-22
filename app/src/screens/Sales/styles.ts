import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  padding-top: 60px;
  padding-bottom: 60px;
`

export const ScrollView = styled.ScrollView`
  flex: 1;
`

export const ContentContainer = styled.View`
  display: flex;
  padding: 0px 22px;
  gap: 30px;
`


export const ButtonContainer = styled.View`
  display: flex;
  width: 100%;
  margin-top: 30px;
  align-items: flex-end;
`

export const DiscountListContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`

export const DiscountInfoContainer = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const DiscountInfo = styled.Text<{ color?: string; textSize?: string }>`
  font-size: ${(props) => (props.textSize ? props.textSize : '14px')};
  font-weight: 300;
  color: ${(props) => (props.color ? props.color : '#333333')};
`

export const DiscountError = styled.Text<{ color?: string; textSize?: string }>`
  font-size: ${(props) => (props.textSize ? props.textSize : '14px')};
  font-weight: 300;
  color: ${(props) => (props.color ? props.color : '#333333')};
  text-align: center;
`

import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  display: flex;
  background-color: white;
`

export const ContentContainer = styled.View`
  display: flex;
  margin-top: 80px;
  margin-bottom: 100px;
  padding: 0px 25px;
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

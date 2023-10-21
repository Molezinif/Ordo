import styled from 'styled-components/native'

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 24px;
`

export const BackButton = styled.Image`
  width: 24px;
  height: 24px;
`

export const Title = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`
export const TitleText = styled.Text`
  font-size: 30px;
`

export const Form = styled.View`
  display: flex;
  gap: 20px;
  padding: 30px 24px;
`

export const Label = styled.Text`
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: bold;
`

export const Input = styled.TextInput`
  height: 48px;
  padding: 12px;
  margin-bottom: 16px;
  border: 0.5px solid #121214;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 16px;
`

export const SubmitButton = styled.Button`
  margin-top: 32px;
`

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  flex-grow: 1;
  background-color: #fff;
`
export const ButtonWrapper = styled.View`
  flex: 1;
  padding: 10px 0;
  align-items: flex-end;
`

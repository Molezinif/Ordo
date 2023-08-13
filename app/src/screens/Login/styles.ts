import styled from 'styled-components/native'

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 24px;
`

export const Title = styled.View`
  flex: 1;
  margin-bottom: 24px;
`

export const TitleText = styled.Text`
  font-size: 30px;
  font-weight: bold;
`

export const Form = styled.View`
  flex: 1;
  padding: 0 24px;
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

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`

export const ButtonWrapper = styled.View`
  display: flex;
  padding: 10px 0;
  align-items: center;
`

export const LinkWrapper = styled.View`
  padding: 10px 0;
`

export const LinkText = styled.Text`
  font-size: 16px;
  color: #8d8d99;
`

export const LinkContent = styled.Text`
  font-size: 16px;
  color: #65b3ff;
  text-decoration: underline;
`

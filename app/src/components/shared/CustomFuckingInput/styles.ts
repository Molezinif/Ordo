import styled from 'styled-components/native'

export const Input = styled.TextInput<{ error: any }>`
  min-height: 48px;
  padding: 12px;
  border: ${({ error }) => (error ? '0.5px solid red' : '0.5px solid #121214')};
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 16px;
`

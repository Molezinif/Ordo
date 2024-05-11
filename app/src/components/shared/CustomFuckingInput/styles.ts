import styled from 'styled-components/native'
import { Input as InputBase } from 'native-base'

export const Input = styled(InputBase)<{ error }>`
  min-height: 48px;
  padding: 12px;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 16px;
`

import styled from 'styled-components/native'

interface ButtonWrapperProps {
  warning?: boolean
  important?: boolean
  backgroundColor?: string
  width?: string
}

export const ButtonWrapper = styled.TouchableOpacity<ButtonWrapperProps>`
  padding: 10px;
  border-radius: 15px;
  background-color: ${(props) => props.backgroundColor || '#65B3FF'};
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.width ? props.width : '100%')};
  min-width: 150px;
`

export const ButtonText = styled.Text<{
  warning?: boolean
  important?: boolean
  disabled?: boolean
}>`
  font-size: 18px;
  color: white;
  opacity: 1;
`

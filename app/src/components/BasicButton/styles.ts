import styled from 'styled-components/native'

export const ButtonWrapper = styled.TouchableOpacity<{
  warning?: boolean
  important?: boolean
}>`
  paddingvertical: 10px;
  paddinghorizontal: 10px;
  border-radius: 10px;
  background-color: 'fff';
  border: ${(props: any) =>
    props.warning
      ? `1px solid ${props.theme.warning}`
      : props.important
      ? `1px solid ${props.theme.primary}`
      : `1px solid ${props.theme.neutral}`};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px;
`

export const ButtonText = styled.Text<{
  warning?: boolean
  important?: boolean
  disabled?: boolean
}>`
  font-size: 18px;
  color: ${(props: any) =>
    props.warning
      ? props.theme.warning
      : props.important
      ? props.theme.primary
      : props.theme.text};
  opacity: ${(props: any) => (props.disabled ? 0.2 : 1)};
`

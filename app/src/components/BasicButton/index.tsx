import React from 'react'

import { ButtonWrapper, ButtonText } from './styles'

interface Props {
  text: string
  onPress: (...args: any[]) => void
  warning?: boolean
  important?: boolean
  disabled?: boolean
  backgroundColor?: string
  width?: string
}

const BasicButton = ({
  text,
  onPress,
  warning,
  important,
  disabled,
  backgroundColor,
  width
}: Props): JSX.Element => {
  return (
    <ButtonWrapper
      disabled={disabled}
      onPress={disabled ? () => null : onPress}
      warning={warning}
      important={important}
      backgroundColor={backgroundColor}
      width={width}
    >
      <ButtonText warning={warning} important={important} disabled={disabled}>
        {text}
      </ButtonText>
    </ButtonWrapper>
  )
}

export { BasicButton }

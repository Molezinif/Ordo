import React from 'react'
import { Button } from 'native-base'

interface Props {
  onPress: (...args: any[]) => void
  disabled?: boolean
  width?: string
  height?: string
  size?: string
  text: string
}

const BasicButton = ({
  text,
  onPress,
  disabled,
  width,
  size
}: Props): JSX.Element => {
  return (
    <Button
      onPress={onPress}
      style={{ backgroundColor: '#65B3FF' }}
      size={size}
      _text={{ fontSize: 16, fontWeight: 'bold' }}
      width={width}
      borderRadius={10}
      disabled={disabled}
    >
      {text}
    </Button>
  )
}

export { BasicButton }

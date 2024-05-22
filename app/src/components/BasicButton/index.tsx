import React from 'react'
import { Button, Icon } from 'native-base'

interface Props {
  onPress: (...args: any[]) => void
  disabled?: boolean
  width?: string
  height?: string
  size?: string
  fontSize?: number
  text: string
  backgroundColor?: string
}

const BasicButton = ({
  text,
  onPress,
  disabled,
  width,
  fontSize,
  size,
  ...props
}: Props): JSX.Element => {
  return (
    <Button
      onPress={onPress}
      style={{ backgroundColor: '#3789db' }}
      size={size}
      _text={{ fontSize: fontSize ?? 16, fontWeight: 'bold' }}
      width={width}
      borderRadius={10}
      disabled={disabled}
      {...props}
    >
      {text}
    </Button>
  )
}

export { BasicButton }

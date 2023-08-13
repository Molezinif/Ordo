import React, { useState } from 'react'
import { Container, OptionOne, OptionText, OptionTwo } from './styles'

interface Props {
  optionOneText: string
  optionTwoText: string
  optionOneOnPress?: () => void
  optionTwoOnPress?: () => void
}

export function ToggleButton({
  optionOneText,
  optionTwoText,
  optionOneOnPress,
  optionTwoOnPress
}: Props) {
  const [selectedOption, setSelectedOption] = useState<
    'optionOne' | 'optionTwo'
  >('optionOne')

  const onPressOne = () => {
    setSelectedOption('optionOne')
    if (optionOneOnPress) optionOneOnPress()
  }

  const onPressTwo = () => {
    setSelectedOption('optionTwo')
    if (optionTwoOnPress) optionTwoOnPress()
  }

  const isOne = selectedOption === 'optionOne'
  const isTwo = selectedOption === 'optionTwo'

  return (
    <Container>
      <OptionOne isSelected={isOne} onPress={onPressOne} activeOpacity={1}>
        <OptionText isSelected={isOne}>{optionOneText}</OptionText>
      </OptionOne>
      <OptionTwo isSelected={isTwo} onPress={onPressTwo} activeOpacity={1}>
        <OptionText isSelected={isTwo}>{optionTwoText}</OptionText>
      </OptionTwo>
    </Container>
  )
}

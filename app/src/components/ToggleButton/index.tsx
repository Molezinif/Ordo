import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { Container, OptionOne, OptionText, OptionTwo } from './styles'

interface Props {
  optionOneText: string
  optionTwoText: string
  optionOneOnPress?: () => void
  optionTwoOnPress?: () => void
}

export const ToggleButton = forwardRef(function ToggleButton(
  { optionOneText, optionTwoText, optionOneOnPress, optionTwoOnPress }: Props,
  ref: any
) {
  const [selectedOption, setSelectedOption] = useState<
    'optionOne' | 'optionTwo'
  >('optionOne')

  useImperativeHandle(ref, () => {
    return {
      selectOption: (option: 'optionOne' | 'optionTwo') => {
        setSelectedOption(option)
      }
    }
  })

  const onPressOne = () => {
    setSelectedOption('optionOne')
    if (optionOneOnPress) optionOneOnPress()
  }

  const onPressTwo = () => {
    setSelectedOption('optionTwo')
    if (optionTwoOnPress) optionTwoOnPress()
  }

  useEffect(() => {
    if (ref?.current?.selectOption) {
      ref.current.selectOption = (option: 'optionOne' | 'optionTwo') => {
        setSelectedOption(option)
      }
    }
  }, [ref])

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
})

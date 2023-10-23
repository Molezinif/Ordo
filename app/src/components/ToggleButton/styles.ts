import { Text } from 'native-base'
import styled from 'styled-components/native'

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
`

export const OptionOne = styled.TouchableOpacity<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? '#65B3FF' : '#ffffff')};
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 90px;
`

export const OptionText = styled(Text)<{ isSelected: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.isSelected ? '#ffffff' : '#8D8D99')};
`

export const OptionTwo = styled.TouchableOpacity<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? '#65B3FF' : '#ffffff')};
  padding: 8px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 90px;
`

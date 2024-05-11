import React, { forwardRef } from 'react'
import { KeyboardTypeOptions, Text, TouchableOpacity, View } from 'react-native'
import { Input } from './styles'
import { Input as InputBase } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface CustomInputProps {
  placeholder: string
  InputTitle?: string
  type: string
  keyboardType?: KeyboardTypeOptions
  value: string
  onChange: any
  error?: any
  defaultValue?: string
  borderRadius?: string
  icon?: any
}

interface PasswordIconProps {
  showPassword: boolean
  handleShowPassword: () => void
}

const PasswordIcon = ({
  showPassword,
  handleShowPassword
}: PasswordIconProps) => {
  return showPassword ? (
    <TouchableOpacity
      style={{ position: 'absolute', right: 10, top: 10 }}
      onPress={handleShowPassword}
    >
      <MaterialCommunityIcons name="eye-outline" size={28} color="#C4C4CC" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={{ position: 'absolute', right: 10, top: 10 }}
      onPress={handleShowPassword}
    >
      <MaterialCommunityIcons
        name="eye-off-outline"
        size={28}
        color="#C4C4CC"
      />
    </TouchableOpacity>
  )
}

export const CustomInput = forwardRef(function CustomInputComponent(
  props: CustomInputProps,
  ref
) {
  const {
    placeholder,
    InputTitle,
    type,
    value,
    onChange,
    borderRadius,
    error,
    defaultValue,
    icon,
    keyboardType
  } = props

  const [showPassword, setShowPassword] = React.useState(false)

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <View style={{ minWidth: '100%' }}>
      {InputTitle ? (
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            paddingHorizontal: 10,
            paddingVertical: 2,
            zIndex: 99,
            top: -12,
            left: 15
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '400'
            }}
          >
            {InputTitle}
          </Text>
        </View>
      ) : null}
      <Input
        ref={ref}
        keyboardType={keyboardType ?? 'default'}
        isInvalid={error}
        borderRadius={borderRadius ?? "8"}
        placeholder={placeholder}
        bgColor={'white'}
        InputLeftElement={icon}
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        secureTextEntry={type === 'password' && !showPassword}
        defaultValue={defaultValue ?? ''}
      />
      {type === 'password' ? (
        <PasswordIcon
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
        />
      ) : null}
      {error ? (
        <Text
          style={{
            color: 'red',
            fontSize: 12,
            fontWeight: '400',
            marginTop: 5
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  )
})

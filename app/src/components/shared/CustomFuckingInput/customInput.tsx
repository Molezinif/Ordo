import React, { forwardRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Input } from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

interface CustomInputProps {
  placeholder: string
  InputTitle?: string
  type: string
  name: string
  contentType?: string
  value: string
  onChange: any
  error?: any
  defaultValue?: string
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
    contentType,
    error,
    defaultValue
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
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        keyboardType={type === 'password' ? 'default' : type}
        textContentType={contentType ?? 'none'}
        secureTextEntry={type === 'password' && !showPassword}
        error={error}
        defaultValue={defaultValue ?? ''}
        ref={ref}
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

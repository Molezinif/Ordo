import React from 'react'
import { Text, View, TextInput } from 'react-native'
import { Controller } from 'react-hook-form'
import { Input } from './styles'

interface CustomInputProps {
  placeholder: string
  InputTitle?: string
  type: string
  control: any
  name: string
  contentType?: string
}

export const CustomInput = ({
  placeholder,
  InputTitle,
  type,
  control,
  name,
  contentType
}: CustomInputProps) => {
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

      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType={type}
            textContentType={contentType ?? 'none'}
          />
        )}
      />
    </View>
  )
}

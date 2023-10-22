import React from 'react'
import { ButtonWrapper, Form, Header, Title, TitleText } from './styles'
import { BasicButton } from '@/components/BasicButton'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'
import { CustomInput } from '@/components/shared/CustomFuckingInput'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export function Register({ navigation }: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data?.email, data?.password)
      navigation.navigate('Login')
    } catch (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  const handleFormatPhoneNumber = (inputValue: string) => {
    // Remove any non-numeric characters
    const numericValue = inputValue.replace(/\D/g, '')

    let maskedValue = ''

    for (let i = 0; i < numericValue.length; i++) {
      if (i === 0) {
        maskedValue += '('
      } else if (i === 2) {
        maskedValue += ') '
      } else if (i === 7) {
        maskedValue += '-'
      }
      maskedValue += numericValue[i]
    }

    return maskedValue.slice(0, 15) // (99) 99999-9999
  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      style={{
        flex: 1,
        backgroundColor: 'white'
      }}
    >
      <Header>
        <Title>
          <TitleText>Bem vindo,</TitleText>
          <TitleText>Cadastre-se</TitleText>
        </Title>
      </Header>
      <Form>
        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              placeholder="example@email.com"
              InputTitle={'Email:'}
              error={errors?.email?.message}
              name="email"
              type="default"
            />
          )}
          name="email"
          rules={{
            required: 'Email é obrigatório',
            validate: (value) => {
              const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
              if (!isValidEmail) {
                setError('email', {
                  type: 'validate',
                  message: 'Email inválido'
                })

                return false
              }
              return true
            }
          }}
        />

        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              onChange={(text) => {
                const formattedNumber = handleFormatPhoneNumber(text)
                field.onChange(formattedNumber)
              }}
              value={field.value}
              placeholder="(99) 99999-9999"
              InputTitle={'Telefone:'}
              error={errors?.Phone?.message}
              name="Phone"
              type="numeric"
            />
          )}
          name="Phone"
          rules={{ required: 'Telefone é obrigatório' }}
        />

        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              placeholder="Insira seu nome"
              InputTitle={'Usuário:'}
              name="user"
              error={errors?.user?.message}
              type="default"
            />
          )}
          name="user"
          rules={{ required: 'Usuário é obrigatório' }}
        />

        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              placeholder="Insira a senha"
              InputTitle={'Senha:'}
              error={errors?.password?.message}
              name="password"
              type="password"
            />
          )}
          name="password"
          rules={{ required: 'Senha é obrigatória' }}
        />

        <Controller
          control={control}
          render={({ field }) => (
            <CustomInput
              {...field}
              placeholder="Confirme sua senha"
              InputTitle={'Confirmar senha:'}
              error={errors?.confirmPassword?.message}
              name="confirmPassword"
              type="password"
            />
          )}
          name="confirmPassword"
          rules={{ required: 'Confirmação de senha é obrigatória' }}
        />

        <ButtonWrapper>
          <BasicButton
            onPress={handleSubmit(onSubmit)}
            text="Finalizar"
            width="50%"
            size="md"
          />
        </ButtonWrapper>
      </Form>
    </KeyboardAwareScrollView>
  )
}

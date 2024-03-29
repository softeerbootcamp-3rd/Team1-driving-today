import styled from '@emotion/styled'
import {forwardRef, InputHTMLAttributes} from 'react'

import {Flex} from '@/components/flex'
import {Typography} from '@/components/typography'

import {Input} from '../styles'

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}
export const TextField = forwardRef<HTMLInputElement, InputFieldProps>(function TextField(
  {label, ...inputProps}: InputFieldProps,
  ref,
) {
  return (
    <Flex as="label" gap="0.5rem" flexDirection="column">
      <Label as="span" requried={inputProps.required} size="1.4rem" weight="bold" color="gray900">
        {label}
      </Label>
      <Input
        ref={ref}
        onChange={(e) => {
          const input = e.target as HTMLInputElement
          if (input.validity.customError) {
            input.setCustomValidity('')
            input.reportValidity()
          }
        }}
        {...inputProps}
      />
    </Flex>
  )
})

const Label = styled(Typography)<{requried?: boolean}>(({theme, requried}) => ({
  '&:after': requried && {
    content: '"*"',
    color: theme.color.warning,
    marginLeft: '0.3rem',
  },
}))

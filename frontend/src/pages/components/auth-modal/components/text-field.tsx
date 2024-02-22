import styled from '@emotion/styled'
import {InputHTMLAttributes} from 'react'

import {Flex} from '@/components/flex'
import {Typography} from '@/components/typography'

import {Input} from '../styles'

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}
export function TextField({label, ...inputProps}: InputFieldProps) {
  return (
    <Flex as="label" gap="0.5rem" flexDirection="column">
      <Label as="span" requried={inputProps.required} size="1.4rem" weight="bold" color="gray900">
        {label}
      </Label>
      <Input {...inputProps} />
    </Flex>
  )
}

const Label = styled(Typography)<{requried?: boolean}>(({theme, requried}) => ({
  '&:after': requried && {
    content: '"*"',
    color: theme.color.warning,
    marginLeft: '0.3rem',
  },
}))

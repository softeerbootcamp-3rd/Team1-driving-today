import styled from '@emotion/styled'
import {forwardRef, TextareaHTMLAttributes, useState} from 'react'

import {Flex} from '@/components/flex'
import {Typography} from '@/components/typography'

import {TextArea} from '../styles'

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  function TextAreaField({label, ...textAreaProps}, ref) {
    return (
      <Flex as="label" gap="0.5rem" flexDirection="column">
        <Label
          as="span"
          requried={textAreaProps.required}
          size="1.4rem"
          weight="bold"
          color="gray900"
        >
          {label}
        </Label>
        <TextArea ref={ref} {...textAreaProps} />
      </Flex>
    )
  },
)

const Label = styled(Typography)<{requried?: boolean}>(({theme, requried}) => ({
  '&:after': requried && {
    content: '"*"',
    color: theme.color.warning,
    marginLeft: '0.3rem',
  },
}))

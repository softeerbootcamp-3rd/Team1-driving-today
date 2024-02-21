import {TextareaHTMLAttributes} from 'react'

import {Flex} from '@/components/flex'
import {Typography} from '@/components/typography'

import {TextArea} from '../styles'

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export function TextAreaField({label, ...textAreaProps}: TextAreaFieldProps) {
  return (
    <Flex as="label" gap="0.5rem" flexDirection="column">
      <Typography as="span" size="1.4rem" weight="bold" color="gray900">
        {label}
      </Typography>
      <TextArea {...textAreaProps} />
    </Flex>
  )
}

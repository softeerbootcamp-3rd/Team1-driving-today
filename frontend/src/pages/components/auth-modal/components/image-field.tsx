import styled from '@emotion/styled'
import {ChangeEvent, InputHTMLAttributes, useRef, useState} from 'react'

import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {Typography} from '@/components/typography'

export interface ImageFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'accept' | 'multiple'> {
  label: string
}

export function ImageField({label, ...fileInputProps}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageSrc, setImageSrc] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0]
      if (file && file.type.startsWith('image')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          if (typeof reader.result === 'string') setImageSrc(reader.result)
        }
      } else {
        setImageSrc('')
      }
    }
  }

  return (
    <Flex gap="0.5rem" flexDirection="column">
      <Typography as="span" size="1.4rem" weight="bold" color="gray900">
        {label}
      </Typography>
      <Label htmlFor={fileInputProps.id}>
        {imageSrc ? (
          <img
            src={imageSrc}
            style={{objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%'}}
          />
        ) : (
          <span>
            <Icon
              name="avatar"
              width="100%"
              height="100%"
              color="gray400"
              style={{transform: 'translateY(0.8rem)'}}
            />
          </span>
        )}

        <input
          ref={inputRef}
          style={{display: 'none'}}
          multiple={false}
          accept="image/*"
          onChange={handleChange}
          {...fileInputProps}
          type="file"
        />
      </Label>
    </Flex>
  )
}

const Label = styled.label(({theme}) => ({
  overflow: 'hidden',
  borderRadius: '50%',
  width: '7rem',
  height: '7rem',
  cursor: 'pointer',
  backgroundColor: theme.color.gray200,
}))

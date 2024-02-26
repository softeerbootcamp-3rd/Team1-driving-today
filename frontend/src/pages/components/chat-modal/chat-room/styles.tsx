import {type Theme} from '@emotion/react'
import styled from '@emotion/styled'

import {LazyImage} from '@/components/lazy-image'

export const TimeStamp = styled.li(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  '& > div': {
    borderRadius: '9999px',
    textAlign: 'center',
    border: `1px solid ${theme.color.gray300}`,
    backgroundColor: theme.color.white,
    color: theme.color.gray900,
    fontSize: '1.4rem',
    padding: '0.5rem 1rem',
    flex: '0.8 1 0',
  },
  '&:before, &:after': {
    content: '""',
    width: '100%',
    height: '1px',
    backgroundColor: theme.color.gray300,
    flex: '1 1 0',
  },
}))

export const ChatList = styled.ul(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '2rem 0',
  gap: '1rem',
}))

export const Avartar = styled(LazyImage)(({width, height}) => ({
  borderRadius: '50%',
  width,
  height,
}))

export const ChatMessage = styled.div<{bgColor: keyof Theme['color']; color: keyof Theme['color']}>(
  ({theme, bgColor, color}) => ({
    padding: '1rem',
    fontSize: '1.4rem',
    backgroundColor: theme.color[bgColor],
    color: color,
    borderRadius: '0.8rem',
  }),
)

export const ChatTime = styled.span(({theme}) => ({
  fontSize: '1.2rem',
  color: theme.color.gray700,
  alignSelf: 'flex-end',
}))

export const ChatInput = styled.input(({theme}) => ({
  backgroundColor: theme.color.gray200,
  flex: '1 1 0',
  borderRadius: '99px',
  fontSize: '1.4rem',
  padding: '0.7rem 2rem',
}))

export const SendButton = styled.button(({theme}) => ({
  borderRadius: '50%',
  backgroundColor: theme.color.primary,
  padding: '1rem',
}))

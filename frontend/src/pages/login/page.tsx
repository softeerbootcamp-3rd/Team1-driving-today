import styled from '@emotion/styled'
import {useEffect, useState} from 'react'
import {ActionFunctionArgs, Form, redirect, useRouteError} from 'react-router-dom'

import {Button} from '@/components/button'
import {Chip} from '@/components/chip'

import {sessionProvider, UserRole} from '../../utils/session'

export function LoginPage() {
  const [userRole, setUserRole] = useState<UserRole>('STUDENT')
  const error = useRouteError() as Error
  const [loading, setLoading] = useState(false)

  useEffect(() => setLoading((prev) => prev && error === null), [error])

  return (
    <Container disabled={loading}>
      <h1>로그인</h1>
      <div style={{display: 'flex', gap: '1rem'}}>
        <Chip selected={userRole === 'STUDENT'} onClick={() => setUserRole('STUDENT')}>
          학생
        </Chip>
        <Chip selected={userRole === 'INSTRUCTOR'} onClick={() => setUserRole('INSTRUCTOR')}>
          강사
        </Chip>
      </div>
      <Form
        action="/login"
        method="POST"
        style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}
      >
        <Input name="email" type="text" />
        <Input name="password" type="text" />
        <input name="userRole" type="hidden" value={userRole} />
        <Button type="submit" onClick={() => setLoading(true)}>
          로그인
        </Button>
      </Form>
      {error !== null && <p>{error.message}</p>}
    </Container>
  )
}

interface ContainerProps {
  disabled?: boolean
}

const Container = styled.div<ContainerProps>(({disabled}) => ({
  pointerEvents: disabled ? 'none' : 'auto',
  fontSize: '2rem',
  display: 'flex',
  flexDirection: 'column',
  padding: '5rem',
  gap: '1rem',
  alignItems: 'center',
}))

const Input = styled.input(({theme}) => ({
  border: `1px solid ${theme.color.gray300}`,
  borderRadius: '1rem',
}))

// eslint-disable-next-line react-refresh/only-export-components
export async function loginAction({request}: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())
  const userRole = formData['userRole'] as UserRole

  const email = formData['email'] as string
  const password = formData['password'] as string

  if (!userRole) throw new Error('role not defined')
  if (!email) throw new Error('no email')
  if (!password) throw new Error('no password')

  const newSession = await sessionProvider.login(userRole, email, password)
  sessionProvider.session = newSession

  return redirect('/dashboard')
}

import styled from '@emotion/styled'
import {useCallback, useState} from 'react'
import {Form, useNavigate, useRouteError} from 'react-router-dom'

import {Button} from '@/components/button'
import {Chip} from '@/components/chip'
import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {Typography} from '@/components/typography'
import {useEscapeKeydown} from '@/hooks/use-escape-keydown'
import {UserRole} from '@/utils/session'

export function LoginModal() {
  const [userRole, setUserRole] = useState<UserRole>('STUDENT')
  const error = useRouteError() as Error
  const navigate = useNavigate()

  const onDismiss = useCallback(() => {
    navigate('/', {replace: true})
  }, [navigate])

  useEscapeKeydown(onDismiss)

  return (
    <ModalContainer>
      <Dimmed onClick={onDismiss} />
      <Modal flexDirection="column" gap="2.5rem">
        <Flex justifyContent="space-between">
          <Typography as="h1" size="2rem" weight="bold" color="gray900">
            로그인
          </Typography>
          <CloseButton onClick={onDismiss}>
            <Icon name="close" width="1.4rem" height="1.4rem" color="black" />
          </CloseButton>
        </Flex>
        <Flex gap="1rem" flexDirection="column">
          <Typography as="span" size="1.6rem" weight="bold" color="gray900">
            사용자 타입을 선택해주세요
          </Typography>
          <Flex gap="1rem">
            <Chip selected={userRole === 'STUDENT'} onClick={() => setUserRole('STUDENT')}>
              학생
            </Chip>
            <Chip selected={userRole === 'INSTRUCTOR'} onClick={() => setUserRole('INSTRUCTOR')}>
              강사
            </Chip>
          </Flex>
        </Flex>
        <Form
          action="/login"
          method="POST"
          style={{display: 'flex', flexDirection: 'column', width: '100%', gap: '2rem'}}
        >
          <Flex as="label" gap="0.5rem" flexDirection="column">
            <Typography as="span" size="1.6rem" weight="bold" color="gray900">
              이메일
            </Typography>
            <Input autoFocus placeholder="이메일을 입력해주세요" name="email" type="email" />
          </Flex>
          <Flex as="label" gap="0.5rem" flexDirection="column">
            <Typography as="span" size="1.6rem" weight="bold" color="gray900">
              비밀번호
            </Typography>
            <Input placeholder="문자, 숫자, 기호 조합 8자 이상" name="password" type="password" />
          </Flex>
          <input name="userRole" type="hidden" value={userRole} />
          <Button type="submit" style={{marginTop: '1rem'}}>
            로그인
          </Button>
        </Form>
        {error !== null && <ErrorMessage>{error.message}</ErrorMessage>}
      </Modal>
    </ModalContainer>
  )
}

const ModalContainer = styled(Flex)(() => ({
  position: 'fixed',
  inset: 0,
}))

const Modal = styled(Flex)(({theme}) => ({
  zIndex: 1000,
  backgroundColor: theme.color.white,
  padding: '2rem',
  borderRadius: '1.6rem',
  width: '100%',
  maxWidth: '40rem',
  margin: 'auto',
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
}))

const Dimmed = styled.div(() => ({
  position: 'fixed',
  background: 'rgb(0, 0, 0, 20%)',
  inset: 0,
}))

const Input = styled.input(({theme}) => ({
  border: `1px solid ${theme.color.gray300}`,
  borderRadius: '1rem',
  fontSize: '1.6rem',
  padding: '1rem 1.6rem',
  width: '100%',
}))

const ErrorMessage = styled.p(({theme}) => ({
  fontSize: '1.6rem',
  color: theme.color.warning,
}))

const CloseButton = styled.button(({theme}) => ({
  borderRadius: '50%',
  backgroundColor: theme.color.gray100,
  padding: '1rem',
  cursor: 'pointer',
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: theme.color.gray200,
  },
  '&:active': {
    backgroundColor: theme.color.gray300,
  },
}))

import {useCallback, useState} from 'react'
import {Form, useNavigate, useRouteError} from 'react-router-dom'

import {Button} from '@/components/button'
import {Chip} from '@/components/chip'
import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {Typography} from '@/components/typography'
import {useEscapeKeydown} from '@/hooks/use-escape-keydown'
import {UserRole} from '@/utils/session'

import {CloseButton, Dimmed, ErrorMessage, Input, Modal, ModalContainer} from './styles'

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

import {useCallback, useState} from 'react'
import {ActionFunctionArgs, Form, redirect, useNavigate, useRouteError} from 'react-router-dom'

import {Button} from '@/components/button'
import {Chip} from '@/components/chip'
import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {Typography} from '@/components/typography'
import {useEscapeKeydown} from '@/hooks/use-escape-keydown'
import {sessionProvider, UserRole} from '@/utils/session'

import {CloseButton, Dimmed, ErrorMessage, Input, Modal, ModalContainer} from './styles'

function RegisterModalRoot() {
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
          action="/register"
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

function RegisterModalSuccess() {
  return (
    <ModalContainer>
      <Dimmed />
      <Modal>성공!</Modal>
    </ModalContainer>
  )
}

export const RegisterModal = Object.assign(RegisterModalRoot, {
  Success: RegisterModalSuccess,
})

export async function registerAction(actionArg: ActionFunctionArgs) {
  const formData = await actionArg.request.formData()
  const userRole = formData.get('userRole') as UserRole

  switch (userRole) {
    case 'INSTRUCTOR':
      return registerInstructorAction(actionArg)
    case 'STUDENT':
      return registerStudentAction(actionArg)
    default:
  }
}
async function registerInstructorAction({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const userRole = formData.get('userRole') as UserRole
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const passwordConfirm = formData.get('passwordConfirm')
  const phoneNumber = formData.get('phoneNumber')
  const pricePerHour = formData.get('pricePerHour')
  const academyId = formData.get('academyId')
  const instruction = formData.get('instruction')
  const profileImg = formData.get('profileImg')

  const errors = {} as Record<string, string>

  if (!email) errors.email = ''
  if (!password) errors.password = ''
  if (!passwordConfirm) errors.passwordConfirm = ''
  if (!phoneNumber) errors.phoneNumber = ''
  if (password !== passwordConfirm) errors.password = ''

  if (Object.keys(errors).length) {
    return errors
  }

  await sessionProvider.signup({
    role: userRole,
    registerRequest: {
      name,
      email,
      password,
      phoneNumber,
      pricePerHour,
      instruction,
      academyId,
    },
    profileImg,
  })
  return redirect('/register/success')
}

async function registerStudentAction({request}: ActionFunctionArgs) {
  const formData = await request.formData()
  const userRole = formData.get('userRole') as UserRole
  const name = formData.get('name')
  const nickname = formData.get('nickname')
  const email = formData.get('email')
  const password = formData.get('password')
  const passwordConfirm = formData.get('passwordConfirm')
  const phoneNumber = formData.get('phoneNumber')
  const pricePerHour = formData.get('pricePerHour')

  const errors = {} as Record<string, string>

  if (!email) errors.email = ''
  if (!password) errors.password = ''
  if (!passwordConfirm) errors.passwordConfirm = ''
  if (!phoneNumber) errors.phoneNumber = ''
  if (password !== passwordConfirm) errors.password = ''

  if (Object.keys(errors).length) {
    return errors
  }

  await sessionProvider.signup({
    role: userRole,
    registerRequest: {
      name,
      nickname,
      email,
      password,
      phoneNumber,
      pricePerHour,
    },
    profileImg,
  })
  return redirect('/register/success')
}

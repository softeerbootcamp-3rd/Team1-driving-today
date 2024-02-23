import confetti from 'canvas-confetti'
import {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from 'react'
import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
  useRouteError,
} from 'react-router-dom'

import {Button} from '@/components/button'
import {Chip} from '@/components/chip'
import {Flex} from '@/components/flex'
import {Icon} from '@/components/icon'
import {Typography} from '@/components/typography'
import {useEscapeKeydown} from '@/hooks/use-escape-keydown'
import {sessionProvider, UserRole} from '@/utils/session'

import {ImageField, TextAreaField, TextField} from './components'
import {CloseButton, Dimmed, ErrorMessage, Modal, ModalContainer, PrevButton} from './styles'

type Step = 'intro' | 'student' | 'instructor'

function RegisterModalRoot() {
  const [userRole, setUserRole] = useState<UserRole>()
  const [step, setStep] = useState<Step>('intro')
  const error = useRouteError() as Error

  const navigate = useNavigate()

  const onDismiss = useCallback(() => {
    navigate('/', {replace: true})
  }, [navigate])

  return (
    <ModalContainer>
      <Dimmed />
      <Modal flexDirection="column" gap="1rem">
        <Flex justifyContent="flex-end">
          <CloseButton onClick={onDismiss}>
            <Icon name="close" width="1.4rem" height="1.4rem" color="black" />
          </CloseButton>
        </Flex>
        {step === 'intro' && (
          <>
            <Flex gap="2rem" flexDirection="column">
              <Typography as="h1" size="2rem" weight="bold" color="gray900">
                오늘의 운전에 로그인할 계정을 만들어주세요.
              </Typography>
              <Typography as="span" size="1.6rem" weight="bold" color="gray900">
                사용자 타입을 선택해주세요
              </Typography>
              <Flex gap="1rem">
                <Chip
                  selected={userRole === 'STUDENT'}
                  onClick={() => setUserRole('STUDENT')}
                  style={{flex: '1 1 0', height: '7rem', cursor: 'pointer'}}
                >
                  학생
                </Chip>
                <Chip
                  selected={userRole === 'INSTRUCTOR'}
                  onClick={() => setUserRole('INSTRUCTOR')}
                  style={{flex: '1 1 0', height: '7rem', cursor: 'pointer'}}
                >
                  강사
                </Chip>
              </Flex>
            </Flex>
            <Button
              type="button"
              disabled={!userRole}
              onClick={() => setStep(userRole === 'STUDENT' ? 'student' : 'instructor')}
              style={{marginTop: '3rem'}}
            >
              다음
            </Button>
            <Flex gap="1rem" justifyContent="center">
              <Typography size="1.4rem" weight="normar" color="gray900">
                이미 계정이 있으신가요?
              </Typography>
              <Typography
                size="1.4rem"
                weight="normar"
                color="primary"
                style={{textDecoration: 'underline'}}
              >
                <Link to="/login" replace>
                  로그인하기
                </Link>
              </Typography>
            </Flex>
          </>
        )}

        <Form
          action={`/register?userRole=${userRole}`}
          method="POST"
          encType="multipart/form-data"
          style={{
            display: step === 'intro' ? 'none' : 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: '2rem',
          }}
        >
          <input name="userRole" type="hidden" value={userRole} />
          {step === 'student' && <StudentRegisterForm step={step} setStep={setStep} />}
          {step === 'instructor' && <InstructorRegisterForm step={step} setStep={setStep} />}
        </Form>
        {error !== null && <ErrorMessage>{error.message}</ErrorMessage>}
      </Modal>
    </ModalContainer>
  )
}

interface RegisterFormProps {
  step: Step
  setStep: Dispatch<SetStateAction<Step>>
}
function StudentRegisterForm({setStep}: RegisterFormProps) {
  const errors = useActionData()

  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement>>({})

  if (errors) {
    Object.entries(errors).forEach(([k, v]) => {
      inputRefs.current[k]?.setCustomValidity(v ?? '')
      inputRefs.current[k]?.reportValidity()
    })
  }

  return (
    <>
      <Flex gap="1rem" flexDirection="column">
        <Typography as="h1" size="2rem" weight="bold" color="gray900">
          학생 회원 가입
          <br />
          기본 정보를 입력해주세요
        </Typography>
        <ImageField id="profileImg" name="profileImg" label="프로필 이미지 설정" />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.name = elem
          }}
          label="이름"
          autoFocus
          required
          placeholder="성함을 입력해주세요"
          name="name"
          type="text"
        />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.nickname = elem
          }}
          label="닉네임"
          required
          placeholder="사용할 닉네임을 입력해주세요"
          name="nickname"
          type="text"
        />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.email = elem
          }}
          label="이메일"
          required
          placeholder="이메일을 입력해주세요"
          name="email"
          type="email"
        />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.password = elem
          }}
          label="비밀번호"
          required
          placeholder="문자, 숫자, 기호 조합 8자 이상"
          name="password"
          type="password"
        />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.passwordConfirm = elem
          }}
          label="비밀번호 확인"
          required
          placeholder="문자, 숫자, 기호 조합 8자 이상"
          name="passwordConfirm"
          type="password"
        />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.phoneNumber = elem
          }}
          label="전화번호"
          pattern="\d{11,11}"
          required
          placeholder="- 없이 입력해주세요"
          name="phoneNumber"
          type="text"
        />

        <Button type="submit" style={{marginTop: '2rem', height: '4rem'}}>
          완료
        </Button>
        <PrevButton type="button" onClick={() => setStep('intro')}>
          이전으로
        </PrevButton>
      </Flex>
    </>
  )
}

function InstructorRegisterForm({setStep}: RegisterFormProps) {
  const errors = useActionData() as Record<string, string>
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement>>({})

  if (errors) {
    Object.entries(errors).forEach(([k, v]) => {
      inputRefs.current[k]?.setCustomValidity(v ?? '')
      inputRefs.current[k]?.reportValidity()
    })
  }

  // TODO: 학원 검색 API 연동
  return (
    <>
      <Flex gap="2rem" flexDirection="column">
        <Typography as="h1" size="2rem" weight="bold" color="gray900">
          강사 회원 가입
          <br />
          기본 정보를 입력해주세요
        </Typography>
        <ImageField id="profileImg" name="profileImg" label="프로필 이미지 설정" />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.name = elem
          }}
          label="이름"
          autoFocus
          required
          placeholder="성함을 입력해주세요"
          name="name"
          type="text"
        />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.email = elem
          }}
          label="이메일"
          required
          placeholder="이메일을 입력해주세요"
          name="email"
          type="email"
        />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.password = elem
          }}
          label="비밀번호"
          required
          placeholder="문자, 숫자, 기호 조합 8자 이상"
          name="password"
          type="password"
        />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.passwordConfirm = elem
          }}
          label="비밀번호 확인"
          required
          placeholder="문자, 숫자, 기호 조합 8자 이상"
          name="passwordConfirm"
          type="password"
        />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.phoneNumber = elem
          }}
          label="전화번호"
          required
          placeholder="- 없이 입력해주세요"
          pattern="\d{11,11}"
          name="phoneNumber"
          type="text"
        />
        <TextField
          ref={(elem) => {
            if (elem) inputRefs.current.pricePerHour = elem
          }}
          label="시급"
          required
          min="0"
          placeholder="시급을 입력해주세요"
          name="pricePerHour"
          type="number"
        />
        <TextAreaField
          ref={(elem) => {
            if (elem) inputRefs.current.detail = elem
          }}
          label="소개 작성"
          required
          placeholder="소개를 작성해주세요"
          name="detail"
        />
        <Button type="submit" style={{marginTop: '2rem', height: '4rem'}}>
          완료
        </Button>
        <PrevButton type="button" onClick={() => setStep('intro')}>
          이전으로
        </PrevButton>
      </Flex>
    </>
  )
}

function RegisterModalSuccess() {
  const navigate = useNavigate()

  const onDismiss = useCallback(() => {
    navigate('/')
  }, [navigate])

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {y: 0.6},
    })
  }, [])

  useEscapeKeydown(onDismiss)

  return (
    <ModalContainer>
      <Dimmed onClick={onDismiss} />
      <Modal>
        <Flex flexDirection="column" flexGrow="1">
          <Flex justifyContent="space-between" flexGrow="1">
            <Typography
              as="h1"
              size="2rem"
              weight="bold"
              color="gray900"
              style={{display: 'flex', justifyContent: 'center', flex: '1 1 0'}}
            >
              회원가입이 완료됐어요!
            </Typography>
            <CloseButton onClick={onDismiss}>
              <Icon name="close" width="1.4rem" height="1.4rem" color="black" />
            </CloseButton>
          </Flex>
          <Flex flexDirection="column" gap="2rem" alignItems="center">
            <img
              src="/clapping-hands.svg"
              className="floating"
              width="100"
              height="100"
              alt="박수치는 손"
              style={{margin: '2rem 0'}}
            />
            <Typography
              size="1.4rem"
              weight="bold"
              color="primary"
              style={{textDecoration: 'underline'}}
            >
              <Link to="/login" replace>
                로그인 하러가기
              </Link>
            </Typography>
          </Flex>
        </Flex>
      </Modal>
    </ModalContainer>
  )
}

export const RegisterModal = Object.assign(RegisterModalRoot, {
  Success: RegisterModalSuccess,
})

// eslint-disable-next-line react-refresh/only-export-components
export async function registerAction(actionArg: ActionFunctionArgs) {
  const url = new URL(actionArg.request.url)
  const userRole = new URLSearchParams(url.search).get('userRole') as UserRole

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
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const passwordConfirm = formData.get('passwordConfirm')
  const phoneNumber = formData.get('phoneNumber')
  const pricePerHour = formData.get('pricePerHour')
  // const academyId = formData.get('academyId')
  // TODO: 학원 검색 API 연동 후 제거
  const academyId = 1
  const instruction = formData.get('instruction')
  const profileImg = formData.get('profileImg') as File

  const errors: Record<string, string> = {}

  // input 자체에서 지원하는 validation으로 부족할 경우 여기에 로직 및 메시지 추가
  if (password !== passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  await sessionProvider.signup({
    role: 'INSTRUCTOR',
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
  const name = formData.get('name')
  const nickname = formData.get('nickname')
  const email = formData.get('email')
  const password = formData.get('password')
  const passwordConfirm = formData.get('passwordConfirm')
  const phoneNumber = formData.get('phoneNumber')
  const profileImg = formData.get('profileImg') as File

  const errors: Record<string, string> = {}

  // input 자체에서 지원하는 validation으로 부족할 경우 여기에 로직 및 메시지 추가
  if (password !== passwordConfirm) {
    errors.passwordConfirm = '비밀번호가 일치하지 않습니다'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  await sessionProvider.signup({
    role: 'STUDENT',
    registerRequest: {
      name,
      nickname,
      email,
      password,
      phoneNumber,
    },
    profileImg,
  })
  return redirect('/register/success')
}

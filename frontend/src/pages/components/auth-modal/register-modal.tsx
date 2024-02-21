import {Dispatch, SetStateAction, useCallback, useState} from 'react'
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
            <Typography
              size="1.4rem"
              weight="normar"
              color="gray900"
              style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}
            >
              이미 계정이 있으신가요?
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
            </Typography>
          </>
        )}

        <>
          <Form
            action={`/register?userRole=${userRole}`}
            method="POST"
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
        </>
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
  console.log(errors)
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
          label="이름"
          autoFocus
          required
          placeholder="성함을 입력해주세요"
          name="name"
          type="text"
        />
        <TextField
          label="닉네임"
          required
          placeholder="사용할 닉네임을 입력해주세요"
          name="nickname"
          type="text"
        />
        <TextField
          label="이메일"
          required
          placeholder="이메일을 입력해주세요"
          name="email"
          type="email"
        />
        <TextField
          label="비밀번호"
          required
          placeholder="문자, 숫자, 기호 조합 8자 이상"
          name="password"
          type="password"
        />
        <TextField
          label="비밀번호 확인"
          required
          placeholder="문자, 숫자, 기호 조합 8자 이상"
          name="passwordConfirm"
          type="password"
        />
        <TextField
          label="전화번호"
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
  const errors = useActionData()
  console.log(errors)
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
          label="이름"
          autoFocus
          required
          placeholder="성함을 입력해주세요"
          name="name"
          type="text"
        />
        <TextField
          label="이메일"
          required
          placeholder="이메일을 입력해주세요"
          name="email"
          type="email"
        />
        <TextField
          label="비밀번호"
          required
          placeholder="문자, 숫자, 기호 조합 8자 이상"
          name="password"
          type="password"
        />
        <TextField
          label="비밀번호 확인"
          required
          placeholder="문자, 숫자, 기호 조합 8자 이상"
          name="passwordConfirm"
          type="password"
        />
        <TextField
          label="전화번호"
          required
          placeholder="- 없이 입력해주세요"
          name="phoneNumber"
          type="text"
        />
        <TextField
          label="시급"
          required
          min="0"
          placeholder="시급을 입력해주세요"
          name="pricePerHour"
          type="number"
        />
        <TextAreaField
          label="소개 작성"
          required
          placeholder="소개를 작성해주세요"
          name="pricePerHour"
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
  const url = new URL(actionArg.request.url)
  const userRole = new URLSearchParams(url.search).get('userRole') as UserRole
  console.log(userRole)

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
  const academyId = formData.get('academyId')
  const instruction = formData.get('instruction')
  const profileImg = formData.get('profileImg')
  console.log(profileImg)
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

  console.log({name, nickname, email, password, phoneNumber, profileImg})
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

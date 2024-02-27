import {ActionFunctionArgs, redirect} from 'react-router-dom'

import {sessionProvider, UserRole} from '../../utils/session'

export async function loginAction({request}: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData())
  const userRole = formData['userRole'] as UserRole

  const email = formData['email'] as string
  const password = formData['password'] as string

  if (!userRole) throw new Error('학생 회원인지 강사 회원인지 선택해주세요')
  if (!email) throw new Error('이메일을 입력해주세요')
  if (!password) throw new Error('비밀번호를 입력해주세요')

  await sessionProvider.login({role: userRole, email, password})

  return redirect('/dashboard')
}

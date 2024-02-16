import {ActionFunctionArgs, redirect} from 'react-router-dom'

import {sessionProvider, UserRole} from '@/utils/session'

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

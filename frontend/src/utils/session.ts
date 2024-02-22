import {API_BASE_URL} from '@/utils/constants'

export type UserRole = 'STUDENT' | 'INSTRUCTOR'

export interface Session {
  id: number
  role: UserRole
  accessToken: string
}

export interface SessionProvider {
  session?: Session
  login: (arg: {role: UserRole; email: string; password: string}) => Promise<Session>
  signup: (arg: {
    role: UserRole
    registerRequest: Record<string, unknown>
    profileImg: File | null
  }) => Promise<void>
  logout: () => void
  getAccessToken: () => string
}

const SESSION_KEY = 'session'

function getSessionFromStorage() {
  const sessionStr = localStorage.getItem(SESSION_KEY)
  if (!sessionStr) return
  return JSON.parse(sessionStr) as Session
}

function saveSessionToStorage(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

function resetSession() {
  localStorage.removeItem(SESSION_KEY)
}

export const sessionProvider: SessionProvider = {
  session: getSessionFromStorage(),
  async login({role, email, password}) {
    const body = JSON.stringify({
      email,
      password,
    })

    const res = await fetch(`${API_BASE_URL}${getLoginUrl(role)}`, {
      method: 'POST',
      body,
      headers: {'Content-Type': 'application/json'},
    })

    if (res.status !== 200) {
      throw new Error('login failed')
    }

    const sessionResponse = (await res.json()) as LoginResponse

    const session = {
      id: sessionResponse.id,
      role: role,
      accessToken: sessionResponse.jwt.accessToken,
    } as Session

    saveSessionToStorage(session)

    return session
  },
  signup: async ({role, registerRequest, profileImg}) => {
    const formData = new FormData()
    formData.append(
      'registerRequest',
      new Blob([JSON.stringify(registerRequest)], {type: 'application/json'}),
    )
    if (profileImg && profileImg.type.startsWith('image')) {
      formData.append('profileImg', profileImg)
    }

    const res = await fetch(`${API_BASE_URL}${getSignupUrl(role)}`, {
      method: 'POST',
      body: formData,
    })

    if (res.status !== 201) {
      throw new Error('회원가입에 실패했습니다')
    }
  },
  logout: () => {
    resetSession()
  },
  getAccessToken() {
    const token = this.session?.accessToken
    if (!token) throw Error('no session')
    return token
  },
}

function getLoginUrl(role: UserRole) {
  switch (role) {
    case 'STUDENT':
      return '/student/login'
    case 'INSTRUCTOR':
      return '/instructor/login'
  }
}

function getSignupUrl(role: UserRole) {
  switch (role) {
    case 'STUDENT':
      return '/student/register'
    case 'INSTRUCTOR':
      return '/instructor/register'
  }
}

interface LoginResponse {
  id: number
  jwt: {
    accessToken: string
    refreshToken: string
  }
}

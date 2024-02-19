import {API_BASE_URL} from '@/utils/constants'

export type UserRole = 'STUDENT' | 'INSTRUCTOR'

export interface Session {
  id: number
  role: UserRole
  accessToken: string
}

export interface SessionProvider {
  session?: Session
  login: (role: UserRole, email: string, password: string) => Promise<Session>
  logout: () => void
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
  async login(role: UserRole, email: string, password: string) {
    const body = JSON.stringify({
      email,
      password,
    })

    // api request
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
  logout: () => {},
}

function getLoginUrl(role: UserRole) {
  switch (role) {
    case 'STUDENT':
      return '/student/login'
    case 'INSTRUCTOR':
      return '/instructor/login'
  }
}

interface LoginResponse {
  id: number
  jwt: {
    accessToken: string
    refreshToken: string
  }
}

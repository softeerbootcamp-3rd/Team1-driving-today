import {Suspense} from 'react'

import {errorMessage} from '@/utils/constants'
import {sessionProvider} from '@/utils/session'

import {InstructorChatRoom} from './instructor-chat-room'
import {StudentChatRoom} from './student-chat-room'

export function ChatRoom({userId}: {userId: number}) {
  if (!sessionProvider.session) throw new Error(errorMessage.SESSION_ERROR)
  const role = sessionProvider.session.role
  return (
    <>
      <Suspense>
        {role === 'STUDENT' ? (
          <InstructorChatRoom instructorId={userId} />
        ) : (
          <StudentChatRoom studentId={userId} />
        )}
      </Suspense>
    </>
  )
}

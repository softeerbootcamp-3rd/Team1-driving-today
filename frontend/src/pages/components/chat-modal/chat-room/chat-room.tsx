import {Suspense} from 'react'

import {Loading} from '@/components/loading'
import {sessionProvider} from '@/utils/session'

import {InstructorChatRoom} from './instructor-chat-room'
import {StudentChatRoom} from './student-chat-room'

export function ChatRoom({userId}: {userId: number}) {
  if (!sessionProvider.session) throw new Error('no session')
  const role = sessionProvider.session.role
  return (
    <>
      <Suspense fallback={<Loading />}>
        {role === 'STUDENT' ? (
          <InstructorChatRoom instructorId={userId} />
        ) : (
          <StudentChatRoom studentId={userId} />
        )}
      </Suspense>
    </>
  )
}

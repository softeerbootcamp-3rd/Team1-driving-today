import {useCallback, useEffect, useRef, useState} from 'react'

import {apiCall} from '@/utils/api'
import {sessionProvider} from '@/utils/session'

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

export function useChatSocket(id: number) {
  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>()
  const [messages, setMessages] = useState<ChatMessageHistory[] | null>(null)
  const socketRef = useRef<WebSocket>()
  const [isReady, setIsReady] = useState(false)

  if (!sessionProvider.session) throw new Error('no seesion')
  const role = sessionProvider.session.role

  const handleQuitRoom = useCallback(() => {
    if (!chatRoomInfo) return
    const msg: ChatMessage = {
      type: 'QUIT',
      roomId: chatRoomInfo.roomId,
      sender: sessionProvider.getAccessToken(),
      message: '',
    }
    socketRef.current?.send(JSON.stringify(msg))
    socketRef.current?.close()
  }, [chatRoomInfo])

  const handleSendMessage = useCallback(
    (message: string) => {
      if (!chatRoomInfo) return
      const msg: ChatMessage = {
        type: 'TALK',
        roomId: chatRoomInfo?.roomId,
        sender: sessionProvider.getAccessToken(),
        message: message,
      }
      socketRef.current?.send(JSON.stringify(msg))
    },
    [chatRoomInfo],
  )

  useEffect(() => {
    const path = role === 'INSTRUCTOR' ? '/instructor/enter' : '/student/enter'
    const body = role === 'INSTRUCTOR' ? {studentId: id} : {instructorId: id}
    apiCall(path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    })
      .then((res: Response) => res.json())
      .then((res: ChatRoomEnterResponse) => {
        setChatRoomInfo(res.chatRoomInfo)
        setMessages(res.chatMessageList)
      })
  }, [id, role])

  useEffect(() => {
    if (socketRef.current || !chatRoomInfo) return
    socketRef.current = new WebSocket(SOCKET_URL, sessionProvider.session?.accessToken)
    socketRef.current.onopen = () => {
      const msg: ChatMessage = {
        type: 'ENTER',
        roomId: chatRoomInfo.roomId,
        sender: sessionProvider.getAccessToken(),
        message: '',
      }
      socketRef.current?.send(JSON.stringify(msg))
      setIsReady(true)
    }
    socketRef.current.onmessage = (e: MessageEvent<ChatMessageHistory>) => {
      setMessages((prev) => {
        if (prev === null) return [e.data]
        return [...prev, e.data]
      })
    }
    socketRef.current.onerror = console.error
    socketRef.current.onclose = () => {
      setIsReady(false)
    }

    return () => {
      handleQuitRoom()
    }
  }, [chatRoomInfo, handleQuitRoom])

  return {chatRoomInfo, messages, isReady, handleQuitRoom, handleSendMessage}
}

interface ChatRoomEnterResponse {
  chatRoomInfo: ChatRoomInfo
  chatMessageList: ChatMessageHistory[] | null
}

export interface ChatRoomInfo {
  roomId: number
  studentId: number
  instructorId: number
}

export interface ChatMessage {
  type: 'TALK' | 'QUIT' | 'ENTER'
  roomId: number
  sender: string
  message: string
}

export interface ChatMessageHistory extends ChatMessage {
  timestamp: number
  id: string
}

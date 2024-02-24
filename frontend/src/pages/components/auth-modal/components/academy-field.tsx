import styled from '@emotion/styled'
import {
  forwardRef,
  InputHTMLAttributes,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import {Loading} from '@/components/loading'
import {Typography} from '@/components/typography'
import {useSuspendedApiCall} from '@/hooks/use-api-call'

import {TextField} from '.'

interface AcademyInfo {
  academyId: number
  name: string
}

type AcademyListResponse = AcademyInfo[]

const DEBOUNCE = 300
const POSTFIX = '운전전문학원'

export const AcademyField = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function AcademyField({required, ...props}, ref) {
    const inputRef = useRef<HTMLInputElement>(null)
    const valueRef = useRef<HTMLInputElement>(null)
    const [focus, setFocus] = useState<boolean>(false)
    const [query, setQuery] = useState('')
    const [value, setValue] = useState<AcademyInfo>()

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    useEffect(() => {
      if (!inputRef.current || !focus) return
      const inputElem = inputRef.current

      let timeOutId: number
      const onInput = (e: Event) => {
        if (timeOutId !== undefined) clearTimeout(timeOutId)
        const newQuery = (e.target as HTMLInputElement).value
        timeOutId = setTimeout(() => setQuery(newQuery), DEBOUNCE)
      }
      inputElem.addEventListener('input', onInput)

      return () => {
        inputElem.removeEventListener('input', onInput)
        setQuery('')
        clearTimeout(timeOutId)
      }
    }, [focus])

    return (
      <Container>
        <input ref={valueRef} type="hidden" value={value?.academyId} {...props} />
        <TextField
          placeholder="학원 검색"
          required={required}
          type="text"
          ref={inputRef}
          value={focus ? undefined : value ? `${value.name}${POSTFIX}` : ''}
          defaultValue={focus ? value?.name : undefined}
          onChange={(e) => {
            e.target.setCustomValidity('')
            e.target.reportValidity()
          }}
          onFocus={(e) => {
            if (value) {
              e.target.value = value?.name ?? ''
              setQuery(value.name)
            }
            setFocus(true)
          }}
          onBlur={() => setFocus(false)}
          label="학원 이름"
        />
        {focus && (
          <ResultContainer>
            <Suspense fallback={<Loading />}>
              <AcademyListResult query={query} onAcademySelect={setValue} />
            </Suspense>
          </ResultContainer>
        )}
      </Container>
    )
  },
)

interface AcademyListResultProps {
  query: string
  onAcademySelect: (academy: AcademyInfo) => void
}

function AcademyListResult({query, onAcademySelect}: AcademyListResultProps) {
  const {data} = useSuspendedApiCall<AcademyListResponse>(`/academies?name=${query}`)
  return (
    <>
      {data?.map((v) => (
        <Typography
          key={v.academyId}
          onPointerDown={() => onAcademySelect(v)}
          color="black"
          size="1.6rem"
          weight="400"
          style={{padding: '0.5rem', cursor: 'pointer', width: '100%'}}
        >
          {v.name}운전전문학원
        </Typography>
      ))}
    </>
  )
}

const Container = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
})

const ResultContainer = styled.div(({theme}) => ({
  backgroundColor: theme.color.gray100,
  border: `1px solid ${theme.color.gray300}`,
  flexDirection: 'column',
  gap: '0.5rem',
  overflowY: 'auto',
  opacity: 0.9,
  borderRadius: '1rem',
  display: 'flex',
  position: 'absolute',
  top: '100%',
  width: '100%',
  height: '100px',
}))

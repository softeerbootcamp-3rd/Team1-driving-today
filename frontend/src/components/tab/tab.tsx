/* eslint-disable react-refresh/only-export-components */
import styled from '@emotion/styled'
import {createContext, PropsWithChildren, useContext, useState} from 'react'

interface TabContext {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

const tabContext = createContext<TabContext | null>(null)

interface ProviderProps {
  defaultValue: number
}

function TabProvider({defaultValue, children}: PropsWithChildren<ProviderProps>) {
  const [value, setValue] = useState(defaultValue)
  return <tabContext.Provider value={{value, setValue}}>{children}</tabContext.Provider>
}

type TabOnChange = (value: number) => void
const onChangeContext = createContext<TabOnChange | null>(null)

interface TabItemListProps {
  onChange?: TabOnChange
}

const ItemListContainer = styled.div({display: 'flex'})

function TabItemList({children, onChange}: PropsWithChildren<TabItemListProps>) {
  return (
    <onChangeContext.Provider value={onChange ?? null}>
      <ItemListContainer>{children}</ItemListContainer>
    </onChangeContext.Provider>
  )
}

interface ItemContainerProps {
  selected?: boolean
}

const ItemContainer = styled.div<ItemContainerProps>(({theme, selected}) => ({
  borderBottomWidth: '0.2rem',
  borderColor: selected ? theme.color.primary : 'transparent',
  borderStyle: 'solid',
  textAlign: 'center',
  height: '48px',
  lineHeight: '46px',
  color: theme.color.gray700,
  flexGrow: 1,
  fontSize: '1.4rem',
}))

interface ItemProps {
  label: string
  value: number
}

function TabItem({label, value}: ItemProps) {
  const context = useContext(tabContext)
  const onChange = useContext(onChangeContext)
  const isSelected = value === context?.value
  return (
    <ItemContainer
      selected={isSelected}
      onClick={() => {
        if (!isSelected) onChange?.(value)
        context?.setValue(value)
      }}
    >
      {label}
    </ItemContainer>
  )
}

interface ContentProps {
  value: number
}

function TabContent({value, children}: PropsWithChildren<ContentProps>) {
  const context = useContext(tabContext)
  return context?.value === value ? children : null
}

export const Tab = {
  Provider: TabProvider,
  ItemList: TabItemList,
  Item: TabItem,
  Content: TabContent,
}

/* eslint-disable react-refresh/only-export-components */
import styled from '@emotion/styled'
import {createContext, PropsWithChildren, useContext, useState} from 'react'

const TabContext = createContext<string | null>(null)
const TabSetContext = createContext<React.Dispatch<React.SetStateAction<string>> | null>(null)

interface ProviderProps {
  defaultValue: string
}

function TabProvider({defaultValue, children}: PropsWithChildren<ProviderProps>) {
  const [value, setValue] = useState(defaultValue)
  return (
    <TabContext.Provider value={value}>
      <TabSetContext.Provider value={setValue}>{children}</TabSetContext.Provider>
    </TabContext.Provider>
  )
}

type TabOnChange = (value: string) => void
const TabItemListContext = createContext<TabOnChange | null>(null)

interface TabItemListProps {
  onChange?: TabOnChange
}

const ItemListContainer = styled.div({display: 'flex', userSelect: 'none'})

function TabItemList({children, onChange}: PropsWithChildren<TabItemListProps>) {
  return (
    <TabItemListContext.Provider value={onChange ?? null}>
      <ItemListContainer>{children}</ItemListContainer>
    </TabItemListContext.Provider>
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
  height: '4.8rem',
  lineHeight: '4.6rem',
  color: theme.color.gray700,
  flexGrow: 1,
  fontSize: '1.4rem',
}))

interface ItemProps {
  label: string
  value: string
}

function TabItem({label, value}: ItemProps) {
  const context = useContext(TabContext)
  const setContext = useContext(TabSetContext)
  const onChange = useContext(TabItemListContext)
  const isSelected = value === context
  return (
    <ItemContainer
      selected={isSelected}
      onClick={() => {
        if (!isSelected) onChange?.(value)
        setContext?.(value)
      }}
    >
      {label}
    </ItemContainer>
  )
}

interface ContentProps {
  value: string
}

function TabContent({value, children}: PropsWithChildren<ContentProps>) {
  const context = useContext(TabContext)
  return context === value ? children : null
}

export const Tab = {
  Provider: TabProvider,
  ItemList: TabItemList,
  Item: TabItem,
  Content: TabContent,
}

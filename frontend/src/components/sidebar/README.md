## description

- compound component pattern 방식으로 `Sidebar` 컴포넌트를 사용함

## props

| name | description | default |
| :--: | :---------: | :-----: |
|  -   |      -      |    -    |

## use case

```tsx
<Sidebar.Root>
  <Sidebar.LinkList>
    <Sidebar.Link to="/dashboard" icon="home" label="홈" />
    <Sidebar.Link to="/history" icon="history" label="예약 내역" />
    <Sidebar.Link to="/schedule" icon="reservation" label="연수 예약" />
  </Sidebar.LinkList>
  <Sidebar.Footer>
    <Sidebar.ChatButton />
  </Sidebar.Footer>
</Sidebar.Root>
```

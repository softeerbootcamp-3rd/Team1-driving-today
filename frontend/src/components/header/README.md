## description

- header 컴포넌트

## props

| name |          description           | default |
| :--: | :----------------------------: | :-----: |
| `px` | padding-left and padding-right |    0    |

## use case

```jsx
<Header px="20rem">
  <div style={{display: 'flex', gap: 10}}>
    <Header.BackButton></Header.BackButton>
    <Header.Logo></Header.Logo>
  </div>
  {/* ⬇️ The element that only occupy the space in between */}
  <div style={{flexGrow: '1'}} />
  <div style={{display: 'flex'}}>
    <Notification />
    <Avartar />
    <Menu />
  </div>
</Header>
```

## description

- Icon과 label이 결합된 형태의 컴포넌트
- Sidebar에서 사용
- selected flag로 강조 표시

## use case

```tsx
// with label
<SidebarIcon
  label="홈"
  icon="home"
  selected={true}
/>

// without label
<SidebarIcon
  icon="home"
  selected={false}
/>
```

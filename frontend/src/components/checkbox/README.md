## description

- checkbox 컴포넌트
- `<input type='checkbox' />`에 대한 스타일 적용
- controlled / uncontrolled 방식 모두 지원

## props

```tsx
type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
```

## use case

```tsx
<Checkbox defaultChecked />

// controlled
<Checkbox checked={checked} onChange={() => setChecked((prev) => !prev)} />

// uncontrolled
<Checkbox ref={checkboxRef} />
```

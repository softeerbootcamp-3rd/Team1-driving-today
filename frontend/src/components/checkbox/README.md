## description

- checkbox 컴포넌트
- `<input type='checkbox' />`에 대한 스타일 적용
- `ref`를 넘겨줘 input DOM 노드의 focus 상태 부모 컴포넌트에서 조작할 수 있도록 함

## props

```tsx
type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>
```

## use case

```tsx
<Checkbox defaultChecked />

<Checkbox checked={checked} onChange={() => setChecked((prev) => !prev)} />

<Checkbox ref={checkboxRef} />

// disabled
<Checkbox checked disabled />
<Checkbox disabled />
```

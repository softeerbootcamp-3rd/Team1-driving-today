## description

- Icon과 label이 결합된 형태의 컴포넌트
- Sidebar에서 사용
- selected flag로 강조 표시

## props

|    name     |                description                | default |
| :---------: | :---------------------------------------: | :-----: |
|   `icon`    |                 icon name                 |         |
|   `label`   |         label text (not required)         |         |
| `selected`  |    highlights icon, label, background     |  false  |
| `highlight` | highlights icon only (without background) |  false  |

## use case

```tsx
// with label
<SidebarIcon
  label="홈"
  icon="home"
  selected
/>

// without label
<SidebarIcon
  icon="home"
/>

// highlight
<SidebarIcon
  icon="message"
  highlight
/>
```

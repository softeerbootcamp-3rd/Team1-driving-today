## description

- 칩 컴포넌트

## props

|    name    |                 description                 | default |
| :--------: | :-----------------------------------------: | :-----: |
| `selected` |                 is selected                 |  false  |
| `disabled` | is disabled (dominates `selected` property) |  false  |
|  `large`   |                  is large                   |  false  |

## use case

```tsx
<Chip selected>
  selected
</Chip>

<Chip disabled>
  disabled
</Chip>

<Chip large>
  large
</Chip>
```

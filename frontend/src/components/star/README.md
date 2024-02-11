## description

- star 컴포넌트

## props

|   name   |                                             description                                             |  default  |
| :------: | :-------------------------------------------------------------------------------------------------: | :-------: |
| `value`  | fills completely if greater or equal to 1, half if between 0 and 1, empties if lesser or equal to 0 |           |
| `width`  |                                                width                                                | '1.5rem'  |
| `height` |                                               height                                                | '1.5rem'  |
| `color`  |                                                color                                                | 'gray600' |

## use case

```tsx
<Star value={0}/>
<Star value={0.5}/>
<Star value={1}/>
```

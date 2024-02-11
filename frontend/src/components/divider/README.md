## description

- 요소 간 분리를 위한 divider 컴포넌트

## props

|    name     |                                             description                                             |   default    |
| :---------: | :-------------------------------------------------------------------------------------------------: | :----------: |
|   rounded   |                                        whether or not round                                         |    false     |
| orientation |                                        divider's orientation                                        | `horizontal` |
|    color    |                                           divider's color                                           |  `gray300`   |
|  flexItem   | if being used in a container styled as `display: flex`, a vertical divider will have correct height |    false     |

## use case

```tsx
<Divider />

<Divider rounded />

<div style={{display: 'flex'}}>
    <Divider orientation='vertical' flexItem />
</div>
```

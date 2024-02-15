## description

- 탭 컴포넌트

## props

### Tab.Provider

|     name     |    description    | default |
| :----------: | :---------------: | :-----: |
| defaultValue | initial tab value |         |

### Tab.ItemList

|   name   |             description              |  default  |
| :------: | :----------------------------------: | :-------: |
| onChange | callback invoked on tab value change | undefined |

### Tab.Item

| name  |     description     | default |
| :---: | :-----------------: | :-----: |
| label | display name of tab |         |
| value |    value of tab     |         |

### Tab.Content

|   name   |  description   | default |
| :------: | :------------: | :-----: |
|  value   |  value of tab  |         |
| children | content of tab |         |

## use case

```tsx
// TabList and TabContent must be wrapped inside TabProvider
<Tab.Provider defaultValue={1}>
  <Tab.ItemList onChange={console.log}>
    <Tab.Item label="First Tab" value={1} />
    <Tab.Item label="Second Tab" value={2} />
    <Tab.Item label="Third Tab" value={3} />
  </Tab.ItemList>
  <Tab.Content value={1}>First Tab Content</Tab.Content>
  <Tab.Content value={2}>Second Tab Content</Tab.Content>
  <Tab.Content value={3}>Third Tab Content</Tab.Content>
</Tab.Provider>
```

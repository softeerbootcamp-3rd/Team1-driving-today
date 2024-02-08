export const theme = {
  color: {
    primary: '#1270DD',
    warning: '#E63312',
    sand: '#E4DCD3',
    gray50: '#FEFEFE',
    gray100: '#F7F7FC',
    gray200: '#EFF0F6',
    gray300: '#D9DBE9',
    gray400: '#BEC1D5',
    gray500: '#A0A3BD',
    gray600: '#6E7191',
    gray700: '#4E4B66',
    gray800: '#2A2A44',
    gray900: '#14142B',
    white: '#FFFFFF',
    black: '#000000',
  },
}

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: string
      warning: string
      sand: string
      gray50: string
      gray100: string
      gray200: string
      gray300: string
      gray400: string
      gray500: string
      gray600: string
      gray700: string
      gray800: string
      gray900: string
      white: string
      black: string
    }
  }
}

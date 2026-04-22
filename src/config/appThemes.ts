export const AppThemes = {
  LIGHT: 'light',
  DARK: 'dark'
} as const

export type AppThemes = typeof AppThemes[keyof typeof AppThemes]

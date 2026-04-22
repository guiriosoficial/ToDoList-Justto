const prefix = 'jus'

export const LocalStorageKeys = {
  THEME: `${prefix}-theme`,
  TODOS: `${prefix}-todos`
} as const

export type LocalStorageKeys = typeof LocalStorageKeys[keyof typeof LocalStorageKeys]
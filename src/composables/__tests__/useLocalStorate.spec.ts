import { describe, it, expect, beforeEach, vi } from 'vitest'
import { effectScope, nextTick } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { LocalStorageKeys } from '@/config/localStorageKeys'

function runComposable<T>(fn: () => T): T {
  const scope = effectScope()
  let result!: T

  scope.run(() => {
    result = fn()
  })

  return result
}

describe('useLocalStorage', () => {
  const KEY = LocalStorageKeys.TODOS

  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('initializes with initial value when no data in storage', () => {
    const { state } = runComposable(() =>
      useLocalStorage(KEY, 'default')
    )

    expect(state.value).toBe('default')
  })

  it('loads value from localStorage if exists', () => {
    localStorage.setItem(KEY, JSON.stringify('stored'))

    const { state } = runComposable(() =>
      useLocalStorage(KEY, 'default')
    )

    expect(state.value).toBe('stored')
  })

  it('updates localStorage when state changes', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')

    const { state } = runComposable(() =>
      useLocalStorage(KEY, 'default')
    )

    state.value = 'updated'

    await nextTick()

    expect(setItemSpy).toHaveBeenCalledWith(
      KEY,
      JSON.stringify('updated')
    )
  })

  it('reacts to deep changes (objects)', async () => {
    const { state } = runComposable(() =>
      useLocalStorage(KEY, { name: 'John' })
    )

    state.value.name = 'Jane'

    await nextTick()

    const stored = localStorage.getItem(KEY)

    expect(stored).toContain('Jane')
  })

  it('removes item and resets state', async () => {
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

    const { state, remove } = runComposable(() =>
      useLocalStorage(KEY, 'default')
    )

    state.value = 'something'
    await nextTick()

    remove()

    expect(removeItemSpy).toHaveBeenCalledWith(KEY)
    expect(state.value).toBe('default')
  })

  it('removes invalid JSON from localStorage', () => {
    const removeItemSpy = vi.spyOn(Storage.prototype, 'removeItem')

    localStorage.setItem(KEY, 'invalid-json')

    const { state } = runComposable(() =>
      useLocalStorage(KEY, 'default')
    )

    expect(removeItemSpy).toHaveBeenCalledWith(KEY)
    expect(state.value).toBe('default')
  })
})

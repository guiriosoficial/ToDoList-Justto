import { beforeEach, describe, expect, it, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import JusToggleTheme from '@/components/JusToggleTheme.vue'

const setItem = vi.fn()
const getItem = vi.fn()
const removeAttribute = vi.fn()
const setAttribute = vi.fn()

vi.mock('@/config/appThemes', () => ({
    AppThemes: {
        LIGHT: 'light',
        DARK: 'dark'
    }
}))

vi.mock('@/config/localStorageKeys', () => ({
    LocalStorageKeys: {
        THEME: 'jus-theme'
    }
}))

describe('JusToggleTheme', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        Object.defineProperty(window, 'localStorage', {
            value: { getItem, setItem },
            configurable: true
        })

        Object.defineProperty(document, 'documentElement', {
            value: {
                setAttribute,
                removeAttribute
            },
            configurable: true
        })
    })

    it('loads saved theme on mount', () => {
        getItem.mockReturnValue('dark')

      mount(JusToggleTheme)

        expect(getItem).toHaveBeenCalledWith('jus-theme')
        expect(setAttribute).toHaveBeenCalledWith('data-theme', 'dark')
    })

    it('toggles theme and persists it', async () => {
        getItem.mockReturnValue('light')

        const wrapper = mount(JusToggleTheme)

        await wrapper.find('.toggle-theme-button').trigger('click')

        expect(setAttribute).toHaveBeenLastCalledWith('data-theme', 'dark')
        expect(setItem).toHaveBeenLastCalledWith('jus-theme', 'dark')
    })
})

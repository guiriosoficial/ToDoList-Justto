import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ToggleTheme from '@/components/JusToggleTheme.vue'
import { AppThemes } from '@/config/appThemes'
import { LocalStorageKeys } from '@/config/localStorageKeys'

describe('ToggleTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  function mountComponent() {
    return mount(ToggleTheme, {
      global: {
        stubs: {
          JusIcon: {
            name: 'JusIcon',
            template: '<button />',
            props: ['icon']
          }
        }
      }
    })
  }

  it('applies saved theme on mount', () => {
    localStorage.setItem(LocalStorageKeys.THEME, AppThemes.DARK)

    mountComponent()

    expect(document.documentElement.getAttribute('data-theme'))
      .toBe(AppThemes.DARK)
  })

  it('falls back to light theme if no saved theme', () => {
    mountComponent()

    expect(document.documentElement.getAttribute('data-theme'))
      .toBe(AppThemes.LIGHT)
  })

  it('toggles theme on click', async () => {
    const wrapper = mountComponent()

    await wrapper.get('button').trigger('click')

    expect(document.documentElement.getAttribute('data-theme'))
      .toBe(AppThemes.DARK)
  })

  it('persists theme in localStorage on toggle', async () => {
    const wrapper = mountComponent()

    await wrapper.get('button').trigger('click')

    expect(localStorage.getItem(LocalStorageKeys.THEME))
      .toBe(AppThemes.DARK)
  })

  it('updates icon based on theme', async () => {
    const wrapper = mountComponent()

    const iconComponent = wrapper.getComponent({ name: 'JusIcon' })

    expect(iconComponent.props('icon')).toBe('sun')

    await wrapper.get('button').trigger('click')

    expect(iconComponent.props('icon')).toBe('moon')
  })
})

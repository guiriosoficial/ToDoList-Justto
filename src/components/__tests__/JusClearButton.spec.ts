import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RemoveAllButton from '@/components/JusClearButton.vue'

describe('RemoveAllButton', () => {
  it('renders the button with correct aria-label', () => {
    const wrapper = mount(RemoveAllButton, {
      global: {
        stubs: { JusIcon: true }
      }
    })

    const button = wrapper.get('button')

    expect(button.attributes('aria-label')).toBe('Clear List')
  })

  it('renders JusIcon component', () => {
    const wrapper = mount(RemoveAllButton, {
      global: {
        stubs: { JusIcon: true }
      }
    })

    expect(wrapper.findComponent({ name: 'JusIcon' }).exists()).toBe(true)
  })

  it('emits click event when button is clicked', async () => {
    const wrapper = mount(RemoveAllButton, {
      global: {
        stubs: { JusIcon: true }
      }
    })

    await wrapper.get('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})

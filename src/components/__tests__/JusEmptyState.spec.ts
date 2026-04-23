import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import JusEmptyState from '@/components/JusEmptyState.vue'

describe('JusEmptyState', () => {
  it('renders the empty state message', () => {
    const wrapper = mount(JusEmptyState, {
      global: {
        stubs: { JusIcon: true }
      }
    })

    expect(wrapper.text()).toBe('No tasks Here!')
  })

  it('renders the icon', () => {
    const wrapper = mount(JusEmptyState, {
      global: {
        stubs: { JusIcon: true }
      }
    })

    expect(wrapper.findComponent({ name: 'JusIcon' }).exists()).toBe(true)
  })
})

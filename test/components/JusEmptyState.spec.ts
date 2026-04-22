import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import JusEmptyState from '@/components/JusEmptyState.vue'

describe('JusEmptyState', () => {
    it('renders the empty state message', () => {
        const wrapper = mount(JusEmptyState)

        expect(wrapper.text()).toBe()
        expect(wrapper.findComponent({ name: 'JusIcon' }).exists()).toBe(true)
    })
})

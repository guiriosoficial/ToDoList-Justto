import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import JusIcon from '@/components/JusIcon.vue'

describe('JusIcon', () => {
    it('renders FontAwesomeIcon with the provided icon', () => {
        const wrapper = mount(JusIcon, {
            props: { icon: 'edit' }
        })

        expect(wrapper.text()).toBe('')
        expect(wrapper.findComponent({ name: 'FontAwesomeIcon' }).exists()).toBe(true)
    })
})

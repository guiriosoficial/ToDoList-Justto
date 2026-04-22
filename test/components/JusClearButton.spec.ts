import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import JusClearButton from '@/components/JusClearButton.vue'

describe('JusClearButton', () => {
    it('emits click when pressed', async () => {
        const wrapper = mount(JusClearButton)

        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('click')).toHaveLength(1)
    })
})

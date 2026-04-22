import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import JusTaskInput from '@/components/JusTaskInput.vue'

describe('JusTaskInput', () => {
    it('does not emit create-task when input is empty', async () => {
        const wrapper = mount(JusTaskInput)

        await wrapper.find('input').setValue('   ')
        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('create-task')).toBeFalsy()
    })

    it('emits create-task with trimmed value and clears the input', async () => {
        const wrapper = mount(JusTaskInput)

        const input = wrapper.find('input')
        await input.setValue('  Buy milk  ')
        await wrapper.find('button').trigger('click')

        expect(wrapper.emitted('create-task')).toEqual([['Buy milk']])
        expect((input.element).value).toBe('')
    })

    it('emits create-task on Enter key', async () => {
        const wrapper = mount(JusTaskInput)

        const input = wrapper.find('input')
        await input.setValue('Do homework')
        await input.trigger('keyup.enter')

        expect(wrapper.emitted('create-task')).toEqual([['Do homework']])
    })
})

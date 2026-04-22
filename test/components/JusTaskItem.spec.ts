import { describe, it, vi, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import JusTaskItem from '../../src/components/JusTaskItem.vue'

vi.mock('./JusIcon.vue', () => ({
    default: {
        name: 'JusIcon',
        props: ['icon'],
        template: '<span />'
    }
}))

const task = {
    id: 1,
    name: 'Test task',
    done: false
}

describe('JusTaskItem', () => {
    it('renders task name and checkbox state', () => {
        const wrapper = mount(JusTaskItem, {
            props: { task }
        })

        expect(wrapper.text()).toContain('Test task')
        expect((wrapper.find('input[type="checkbox"]').element).checked).toBe(false)
    })

    it('emits update-task when checkbox changes', async () => {
        const wrapper = mount(JusTaskItem, {
            props: { task }
        })

        await wrapper.find('input[type="checkbox"]').trigger('change')

        expect(wrapper.emitted('update-task')?.[0]?.[0]).toEqual({
            id: 1,
            name: 'Test task',
            done: true
        })
    })

    it('emits remove-task when remove button is clicked', async () => {
        const wrapper = mount(JusTaskItem, {
            props: { task }
        })

        const buttons = wrapper.findAll('button')
        await buttons[1].trigger('click')

        expect(wrapper.emitted('remove-task')).toEqual([[1]])
    })

    it('enters edit mode and emits edit-task with task id', async () => {
        const wrapper = mount(JusTaskItem, {
            props: { task }
        })

        await wrapper.find('button[aria-label="Edit task"]').trigger('click')

        expect(wrapper.emitted('edit-task')).toEqual([[1]])
    })

    it('confirms edition with trimmed name', async () => {
        const wrapper = mount(JusTaskItem, {
            props: {
                task,
                isEditing: true
            }
        })

        const input = wrapper.find('input[type="text"]')
        await input.setValue('  New name  ')
        await input.trigger('keyup.enter')

        expect(wrapper.emitted('update-task')?.[0]?.[0]).toEqual({
            id: 1,
            name: 'New name',
            done: false
        })
        expect(wrapper.emitted('edit-task')?.at(-1)).toEqual([null])
    })

    it('cancels edition on Escape', async () => {
        const wrapper = mount(JusTaskItem, {
            props: {
                task,
                isEditing: true
            }
        })

        await wrapper.find('input[type="text"]').trigger('keyup.esc')

        expect(wrapper.emitted('edit-task')).toEqual([[null]])
    })

    it('focuses the input when entering edit mode', async () => {
        const focusSpy = vi.spyOn(HTMLInputElement.prototype, 'focus').mockImplementation(() => {})

        render(JusTaskItem, {
            props: {
                task,
                isEditing: true
            }
        })

        await nextTick()

        expect(focusSpy).toHaveBeenCalled()
        focusSpy.mockRestore()
    })
})

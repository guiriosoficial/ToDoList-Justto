import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TaskInput from '@/components/JusTaskInput.vue'

function mountComponent() {
  return mount(TaskInput, {
    global: {
      stubs: {
        JusIcon: { template: '<span />' }
      }
    }
  })
}

function getFirstEmitted<T>(
  wrapper: VueWrapper<unknown>,
  event: string
): T {
  const events = wrapper.emitted(event) as unknown[][] | undefined

  expect(events).toBeTruthy()
  expect(events!.length).toBeGreaterThan(0)

  return events![0]![0] as T
}

describe('TaskInput', () => {
  it('emits create-task when clicking button', async () => {
    const wrapper = mountComponent()

    const input = wrapper.get('input')
    await input.setValue('New Task')

    await wrapper.get('[aria-label="Add Task"]').trigger('click')

    const payload = getFirstEmitted<string>(wrapper, 'create-task')

    expect(payload).toBe('New Task')
  })

  it('emits create-task when pressing Enter', async () => {
    const wrapper = mountComponent()

    const input = wrapper.get('input')
    await input.setValue('Another Task')

    await input.trigger('keyup.enter')

    const payload = getFirstEmitted<string>(wrapper, 'create-task')

    expect(payload).toBe('Another Task')
  })

  it('trims the task name before emitting', async () => {
    const wrapper = mountComponent()

    const input = wrapper.get('input')
    await input.setValue('   Trimmed Task   ')

    await wrapper.get('[aria-label="Add Task"]').trigger('click')

    const payload = getFirstEmitted<string>(wrapper, 'create-task')

    expect(payload).toBe('Trimmed Task')
  })

  it('clears the input after creating task', async () => {
    const wrapper = mountComponent()

    const input = wrapper.get('input')
    await input.setValue('Clean me')

    await wrapper.get('[aria-label="Add Task"]').trigger('click')

    expect((input.element as HTMLInputElement).value).toBe('')
  })

  it('does not emit if input is empty', async () => {
    const wrapper = mountComponent()

    await wrapper.get('[aria-label="Add Task"]').trigger('click')

    expect(wrapper.emitted('create-task')).toBeFalsy()
  })

  it('does not emit if input is only whitespace', async () => {
    const wrapper = mountComponent()

    const input = wrapper.get('input')
    await input.setValue('   ')

    await wrapper.get('[aria-label="Add Task"]').trigger('click')

    expect(wrapper.emitted('create-task')).toBeFalsy()
  })
})
